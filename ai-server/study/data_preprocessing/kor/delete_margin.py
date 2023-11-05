import cv2
import numpy as np
import argparse

def auto_detect_edges(image_path):
    # 이미지 읽기
    image = cv2.imread(image_path)
    if image is None:
        raise FileNotFoundError(f"Image not found at {image_path}")

    # 그레이스케일로 변환
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    # 노이즈 제거를 위한 가우시안 블러
    blurred = cv2.GaussianBlur(gray, (5, 5), 0)

    # 엣지 감지
    edged = cv2.Canny(blurred, 30, 150)

    # 윤곽선 찾기
    contours, _ = cv2.findContours(edged.copy(), cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

    # 가장 큰 윤곽선 찾기 (표가 이미지의 주된 객체라고 가정)
    largest_contour = max(contours, key=cv2.contourArea)

    # 윤곽선의 모서리 감지
    # 윤곽선 포인트가 충분히 있지 않은 경우 에러를 반환할 수 있습니다. 이 경우 더 많은 포인트를 감지하도록 코드를 조정해야 합니다.
    epsilon = 0.02 * cv2.arcLength(largest_contour, True)
    approx = cv2.approxPolyDP(largest_contour, epsilon, True)

    if len(approx) == 4:
        # 윤곽선이 4개의 모서리를 가지고 있음 (사각형 또는 직사각형)
        return approx.reshape(-1, 2)  # 모서리 좌표 반환
    else:
        raise ValueError("Could not find a table with four corners.")

def correct_perspective_auto(image_path):
    # 4개의 모서리 좌표 자동 감지
    corners = auto_detect_edges(image_path)

    # 표의 네 모서리를 정렬: 상단 왼쪽, 상단 오른쪽, 하단 오른쪽, 하단 왼쪽
    s = corners.sum(axis=1)
    rect = np.zeros((4, 2), dtype="float32")
    rect[0] = corners[np.argmin(s)]
    rect[2] = corners[np.argmax(s)]

    diff = np.diff(corners, axis=1)
    rect[1] = corners[np.argmin(diff)]
    rect[3] = corners[np.argmax(diff)]

    # 변환될 사각형의 좌표를 정의합니다. (표의 크기를 기반으로)
    (tl, tr, br, bl) = rect
    maxWidth = int(max(np.linalg.norm(br - bl), np.linalg.norm(tr - tl)))
    maxHeight = int(max(np.linalg.norm(tr - br), np.linalg.norm(tl - bl)))

    dst = np.array([
        [0, 0],
        [maxWidth - 1, 0],
        [maxWidth - 1, maxHeight - 1],
        [0, maxHeight - 1]], dtype="float32")

    # 원근 변환 행렬을 계산
    matrix = cv2.getPerspectiveTransform(rect, dst)

    # 이미지 로드
    image = cv2.imread(image_path)
    if image is None:
        raise FileNotFoundError(f"Image not found at {image_path}")

    # 원근 변환 적용
    corrected_image = cv2.warpPerspective(image, matrix, (maxWidth, maxHeight))

    return corrected_image
    # # 변환된 이미지 저장
    # cv2.imwrite(output_path, corrected_image)
    # print(f"Corrected image is saved at {output_path}")

def find_and_crop_table(image_path, output_path):
    # 이미지 파일 읽기
    image = correct_perspective_auto(image_path)

    # 캐니 엣지 디텍션을 이용하여 엣지 찾기
    edged = cv2.Canny(image, 50, 150)

    # 윤곽선 찾기
    contours, _ = cv2.findContours(edged, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

    # 윤곽선을 바탕으로 사각형 영역 찾기
    rects = [cv2.boundingRect(cnt) for cnt in contours]
    rects = sorted(rects, key=lambda x: (x[2] * x[3]), reverse=True)  # 면적이 큰 순으로 정렬

    if rects:
        # 가장 큰 사각형 (표라고 가정) 사용
        x, y, w, h = rects[0]

        # 원본 이미지에서 표 부분만 자르기
        cropped_table = image[y+3:y+h-3, x+3:x+w-3]

        # 결과 이미지 저장
        cv2.imwrite(output_path, cropped_table)
        print(f"Cropped image is saved at {output_path}")
    else:
        print("No table found in the image.")


parser = argparse.ArgumentParser(description='Delte margin of scanned images')
parser.add_argument('--image_path', dest='image_path', required=True, help='directory to read scanned images')
parser.add_argument('--output_path', dest='output_path', required=True, help='directory to save processed images')

args = parser.parse_args()

if __name__ == "__main__":
    find_and_crop_table(args.image_path, args.output_path)
