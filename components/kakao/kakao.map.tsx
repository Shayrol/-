"use client";

import Script from "next/script";
import { useEffect, useRef } from "react";

declare global {
  interface Window {
    kakao: typeof kakao;
  }
}

interface KakaoMapProps {
  mapx: string;
  mapy: string;
  mlevel: string;
  zipcode: string;
  title: string;
  className: string | undefined;
}

export default function KakaoMap({
  mapx,
  mapy,
  mlevel,
  zipcode,
  title,
  className,
}: KakaoMapProps) {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);
  const initializedRef = useRef(false);

  const initializeMap = () => {
    if (!window.kakao || !mapRef.current) return;
    if (initializedRef.current) return;

    initializedRef.current = true;

    const container = mapRef.current;

    window.kakao.maps.load(() => {
      const position = new window.kakao.maps.LatLng(Number(mapy), Number(mapx));

      const map = new window.kakao.maps.Map(container, {
        center: position,
        level: Number(mlevel),
      });

      new window.kakao.maps.Marker({
        position,
        map,
      });

      resizeObserverRef.current = new ResizeObserver(() => {
        map.relayout();
        map.setCenter(position);
      });

      resizeObserverRef.current.observe(container);

      const customOverlay = new window.kakao.maps.CustomOverlay({
        position,
        content: `
        <div style="
          padding: 12px 16px;
          background: #FFFFFF;
          border-radius: 14px;
          box-shadow: 0 4px 16px rgba(23, 33, 27, 0.12);
          font-family: sans-serif;
          white-space: nowrap;
        ">
          <div style="
            font-size: 10px;
            font-weight: 700;
            color: #EC5B3F;
            margin-bottom: 4px;
          ">
            YEODAM · TRAVEL
          </div>

          <div style="
            font-size: 14px;
            font-weight: 700;
            color: #17211B;
          ">
            ${title}
          </div>

          <div style="
            position: absolute;
            bottom: -8px;
            left: 50%;
            transform: translateX(-50%);
            width: 0;
            height: 0;
            border-left: 9px solid transparent;
            border-right: 9px solid transparent;
            border-top: 9px solid #FFFFFF;
          "></div>
        </div>
      `,
        yAnchor: 1.9,
        xAnchor: 0.5,
        zIndex: 2,
      });

      customOverlay.setMap(map);
    });
  };

  useEffect(() => {
    return () => {
      resizeObserverRef.current?.disconnect();
    };
  }, []);

  return (
    <>
      <Script
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY}&autoload=false`}
        strategy="afterInteractive"
        onReady={initializeMap}
        onError={() => console.error("카카오맵 SDK 로딩 실패")}
      />
      <div ref={mapRef} className={className} aria-label="카카오 지도" />
    </>
  );
}
