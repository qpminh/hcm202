import { useEffect, useRef } from "react";
import { Hands } from "@mediapipe/hands";
import type { Results } from "@mediapipe/hands";
import * as cam from "@mediapipe/camera_utils";

export const useHandTracker = (
  webcamRef: React.RefObject<any>,
  onSwipe: () => void,
  onStop: () => void,
  active: boolean
) => {
  const cameraRef = useRef<any>(null);
  const stopTriggerCount = useRef(0); // Bộ đếm để xác nhận tay giơ ổn định

  useEffect(() => {
    if (!active) {
      if (cameraRef.current) {
        cameraRef.current.stop();
        cameraRef.current = null;
      }
      return;
    }

    const hands = new Hands({
      locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
    });

    hands.setOptions({
      maxNumHands: 1,
      modelComplexity: 1,
      minDetectionConfidence: 0.7,
      minTrackingConfidence: 0.7,
    });

    hands.onResults((results: Results) => {
      if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
        const landmarks = results.multiHandLandmarks[0];

        // KIỂM TRA TAY MỞ (✋): Các đầu ngón tay cao hơn khớp đốt ngón tay
        // Landmark index: 8 (trỏ), 12 (giữa), 16 (áp út), 20 (út)
        const isHandOpen =
          landmarks[8].y < landmarks[6].y &&
          landmarks[12].y < landmarks[10].y &&
          landmarks[16].y < landmarks[14].y &&
          landmarks[20].y < landmarks[18].y;

        if (isHandOpen) {
          stopTriggerCount.current += 1;
          // Nếu tay xòe ổn định trong khoảng 5 frames (~150ms)
          if (stopTriggerCount.current > 5) {
            console.log("✋ Nhận diện giơ tay dừng!");
            onStop();
            stopTriggerCount.current = 0; // Reset sau khi gọi
          }
        } else {
          stopTriggerCount.current = 0; // Reset nếu gập tay lại
        }
      }
    });

    const initCamera = () => {
      const videoElement = webcamRef.current?.video;
      if (videoElement && videoElement.readyState >= 2) {
        cameraRef.current = new cam.Camera(videoElement, {
          onFrame: async () => { await hands.send({ image: videoElement }); },
          width: 640, height: 480,
        });
        cameraRef.current.start();
      } else {
        setTimeout(initCamera, 500);
      }
    };

    initCamera();

    return () => {
      cameraRef.current?.stop();
      cameraRef.current = null;
    };
  }, [active, onStop, webcamRef]);
};