
import cv2
import math
from ultralytics import YOLO
from collections import defaultdict

# Load YOLO model
model = YOLO("yolo11n.pt")

# Class list
class_list = model.names

for i in class_list.items():
    print(i)
print("Classes:", class_list[0])
import json
with open("abc.json","w") as f:
    json.dump(class_list,f);

# # Open video file
# cap = cv2.VideoCapture("4.mp4")
# fps = cap.get(cv2.CAP_PROP_FPS)

# # Pixel-to-meter calibration (adjust based on your camera setup)
# PIXEL_TO_METER = 0.05  # 1 pixel = 0.05 m (example)

# # Define line positions for counting
# line_y_red = 350
# line_y_blue = line_y_red + 50

# # Tracking dictionaries
# counted_ids_red_to_blue = set()
# counted_ids_blue_to_red = set()
# count_red_to_blue = defaultdict(int)
# count_blue_to_red = defaultdict(int)
# crossed_red_first = {}
# crossed_blue_first = {}

# # Speed tracking
# prev_positions = {}  # {track_id: (cx, cy)}
# speeds = {}          # {track_id: current_speed_kmh}

# # Storage for results
# results_list = []    # [[frame, id1, id2, speed1, speed2, distance], ...]

# frame_no = 0

# while cap.isOpened():
#     ret, frame = cap.read()
#     if not ret:
#         break
#     frame_no += 1

#     # Run YOLO tracker
#     results = model.track(frame, persist=True, tracker="bytetrack.yaml")

#     if results[0].boxes.data is not None:
#         boxes = results[0].boxes.xyxy.cpu()
#         track_ids = results[0].boxes.id.int().cpu().tolist()
#         class_indices = results[0].boxes.cls.int().cpu().tolist()
#         confidence = results[0].boxes.conf.cpu()

#         vehicle_positions = []

#         # Draw counting lines
#         cv2.line(frame, (70, line_y_red), (1200, line_y_red), (0, 0, 255), 3)
#         cv2.putText(frame, "Red Line", (20, line_y_red - 10),
#                     cv2.FONT_HERSHEY_SIMPLEX, 0.6, (255, 255, 255), 1)
#         cv2.line(frame, (70, line_y_blue), (1200, line_y_blue), (255, 0, 0), 3)
#         cv2.putText(frame, "Blue Line", (20, line_y_blue - 10),
#                     cv2.FONT_HERSHEY_SIMPLEX, 0.6, (255, 255, 255), 1)

#         # Process each detected vehicle
#         for box, track_id, class_idx, conf in zip(boxes, track_ids, class_indices, confidence):
#             x1, y1, x2, y2 = map(int, box)
#             cx = (x1 + x2) // 2
#             cy = (y1 + y2) // 2
#             class_name = class_list[class_idx]

#             # --- Speed calculation ---
#             if track_id in prev_positions:
#                 px, py = prev_positions[track_id]
#                 dist_pixels = math.sqrt((cx - px)**2 + (cy - py)**2)
#                 dist_meters = dist_pixels * PIXEL_TO_METER
#                 speed_mps = dist_meters * fps
#                 speed_kmh = speed_mps * 3.6
#             else:
#                 speed_kmh = 0.0

#             prev_positions[track_id] = (cx, cy)
#             speeds[track_id] = speed_kmh

#             vehicle_positions.append((track_id, cx, cy, speed_kmh, class_name))

#             # Draw detections
#             cv2.circle(frame, (cx, cy), 4, (0, 0, 255), -1)
#             cv2.putText(frame, f"ID:{track_id} {class_name} {speed_kmh:.1f} km/h",
#                         (x1, y1 - 10), cv2.FONT_HERSHEY_SIMPLEX,
#                         0.6, (0, 255, 255), 2)
#             cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 255, 0), 2)

#             # --- Counting logic ---
#             if line_y_red - 3 <= cy <= line_y_red + 3:
#                 if track_id not in crossed_red_first:
#                     crossed_red_first[track_id] = True

#             if line_y_blue - 3 <= cy <= line_y_blue + 3:
#                 if track_id not in crossed_blue_first:
#                     crossed_blue_first[track_id] = True

#             if track_id in crossed_red_first and track_id not in counted_ids_red_to_blue:
#                 if line_y_blue - 5 <= cy <= line_y_blue + 5:
#                     count_red_to_blue[class_name] += 1
#                     counted_ids_red_to_blue.add(track_id)

#             if track_id in crossed_blue_first and track_id not in counted_ids_blue_to_red:
#                 if line_y_red - 5 <= cy <= line_y_red + 5:
#                     count_blue_to_red[class_name] += 1
#                     counted_ids_blue_to_red.add(track_id)

#         # --- Distance calculation between vehicles ---
#         for i in range(len(vehicle_positions)):
#             for j in range(i + 1, len(vehicle_positions)):
#                 id1, x1, y1, v1, cname1 = vehicle_positions[i]
#                 id2, x2, y2, v2, cname2 = vehicle_positions[j]
#                 dist_pixels = math.sqrt((x1 - x2)**2 + (y1 - y2)**2)
#                 dist_meters = dist_pixels * PIXEL_TO_METER

#                 # Save results
#                 results_list.append([frame_no, id1, id2, v1, v2, dist_meters])

#                 # Draw lines between close vehicles
#                 if dist_meters < 10:  # threshold = 10 meters
#                     cv2.line(frame, (x1, y1), (x2, y2), (255, 255, 0), 2)
#                     cv2.putText(frame, f"{dist_meters:.1f} m",
#                                 ((x1 + x2)//2, (y1 + y2)//2),
#                                 cv2.FONT_HERSHEY_SIMPLEX, 0.5,
#                                 (200, 255, 0), 2)

#     # Display counts
#     y_offset = 30
#     for class_name, count in count_red_to_blue.items():
#         cv2.putText(frame, f"{class_name} (Down): {count}", (10, y_offset),
#                     cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 255, 0), 2)
#         y_offset += 30

#     y_offset += 20
#     for class_name, count in count_blue_to_red.items():
#         cv2.putText(frame, f"{class_name} (Up): {count}", (10, y_offset),
#                     cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 0, 255), 2)
#         y_offset += 30

#     # Show frame
#     # cv2.imshow("YOLO Tracking with Speed & Distance", frame)

#     # if cv2.waitKey(1) & 0xFF == 27:
#     #     break

# cap.release()
# # cv2.destroyAllWindows()

# # Print results for verification
# # # [frame_no, vehicle_id1, vehicle_id2, speed1_kmh, speed2_kmh, distance_m]
# # print("Results List (Last 20 entries):")
# # for r in results_list[:-20:-1]:
# #     print(r)



# # Example mapping of class IDs to names

# # result = {} 

# # for i in results_list :
    

# #     try:
# #         vehicle_type = class_list[int(i[2])]
# #         if vehicle_type not in result:
# #             result[vehicle_type] = {"count": 0, "speeds": []}
                                                        
# #             result[vehicle_type]["count"] += 1
# #             result[vehicle_type]["speeds"].append(i[3])

# #     except:
# #         print("error")
  

# import json
# # with open("results.json", "w") as f:
# #     json.dump(result, f)

# with open("test.json","w") as f:
#     json.dump(results_list,f)