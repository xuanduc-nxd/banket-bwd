import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const targetUrl = searchParams.get('url');

  if (!targetUrl) {
    return new Response("Missing url parameter", { status: 400 });
  }

  const apiKey = process.env.VIETMAP_API_KEY || "154f9927fe7ac8231b3bdfd15e11a530c88e8a63b9f1964e";

  try {
    const parsedTarget = new URL(targetUrl);
    if (parsedTarget.hostname !== 'maps.vietmap.vn') {
      return new Response("Invalid hostname", { status: 403 });
    }

    // Gắn thêm apikey vào query parameters để gửi lên VietMap
    parsedTarget.searchParams.set('apikey', apiKey);

    // Gửi request lên VietMap
    const response = await fetch(parsedTarget.toString());
    const data = await response.arrayBuffer();

    const headers = new Headers();
    const contentType = response.headers.get('content-type');
    const contentEncoding = response.headers.get('content-encoding');
    const cacheControl = response.headers.get('cache-control');

    if (contentType) headers.set('content-type', contentType);
    if (contentEncoding) headers.set('content-encoding', contentEncoding);
    if (cacheControl) headers.set('cache-control', cacheControl);

    // Hỗ trợ CORS
    headers.set('Access-Control-Allow-Origin', '*');

    // Nếu là style.json (hoặc JSON khác), parse và rewrite các URL bên trong
    if (parsedTarget.pathname.endsWith('style.json') || (contentType && contentType.includes('json'))) {
      const decoder = new TextDecoder('utf-8');
      const text = decoder.decode(data);

      // Regex tìm tất cả các URL maps.vietmap.vn để đổi hướng qua proxy của ta
      const hostRegex = /https:\/\/maps\.vietmap\.vn\/[^"'\s]+/g;
      const modifiedText = text.replace(hostRegex, (match) => {
        // Loại bỏ query parameter apikey cũ (nếu có) để bảo mật
        const cleanMatch = match.replace(/([\?&])apikey=[^&"'\s]+/g, '$1').replace(/[\?&]$/, '');
        return `/api/vietmap-proxy?url=${encodeURIComponent(cleanMatch)}`;
      });

      return new Response(modifiedText, {
        status: response.status,
        headers: {
          ...Object.fromEntries(headers),
          'content-type': 'application/json; charset=utf-8'
        }
      });
    }

    return new Response(data, {
      status: response.status,
      headers
    });
  } catch (err) {
    console.error("Lỗi proxy bản đồ VietMap:", err.message);
    return new Response("Proxy error: " + err.message, { status: 500 });
  }
}
