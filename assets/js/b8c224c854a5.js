
(function () {
var DATA = {"dates":["2026-01-28","2026-01-29","2026-01-30","2026-01-31","2026-02-01","2026-02-02","2026-02-03","2026-02-04","2026-02-05","2026-02-06","2026-02-07","2026-02-08","2026-02-09","2026-02-10","2026-02-11","2026-02-12","2026-02-13","2026-02-14","2026-02-15","2026-02-16","2026-02-17","2026-02-18","2026-02-19","2026-02-20","2026-02-21","2026-02-22","2026-02-23","2026-02-24","2026-02-25","2026-02-26","2026-02-27","2026-02-28","2026-03-01","2026-03-02","2026-03-03","2026-03-04","2026-03-05","2026-03-06","2026-03-07","2026-03-08","2026-03-09","2026-03-10","2026-03-11","2026-03-12","2026-03-13","2026-03-14","2026-03-15","2026-03-16","2026-03-17","2026-03-18","2026-03-19","2026-03-20","2026-03-21","2026-03-22","2026-03-23","2026-03-24","2026-03-25","2026-03-26","2026-03-27","2026-03-28","2026-03-29","2026-03-30","2026-03-31","2026-04-01","2026-04-02","2026-04-03","2026-04-04","2026-04-05","2026-04-06","2026-04-07","2026-04-08","2026-04-09","2026-04-10","2026-04-11","2026-04-12","2026-04-13","2026-04-14","2026-04-15","2026-04-16","2026-04-17","2026-04-18","2026-04-19","2026-04-20","2026-04-21","2026-04-22","2026-04-23","2026-04-24","2026-04-25","2026-04-26","2026-04-27","2026-04-28","2026-04-29","2026-04-30","2026-05-01","2026-05-02","2026-05-03","2026-05-04","2026-05-05","2026-05-06","2026-05-07","2026-05-08","2026-05-09","2026-05-10","2026-05-11","2026-05-12","2026-05-13","2026-05-14","2026-05-15","2026-05-16","2026-05-17","2026-05-18","2026-05-19","2026-05-20","2026-05-21","2026-05-22","2026-05-23","2026-05-24","2026-05-25","2026-05-26","2026-05-27","2026-05-28","2026-05-29","2026-05-30","2026-05-31","2026-06-01","2026-06-02","2026-06-03","2026-06-04","2026-06-05","2026-06-06","2026-06-07","2026-06-08","2026-06-09","2026-06-10","2026-06-11","2026-06-12","2026-06-13","2026-06-14","2026-06-15","2026-06-16","2026-06-17","2026-06-18","2026-06-19","2026-06-20","2026-06-21","2026-06-22","2026-06-23","2026-06-24","2026-06-25","2026-06-26","2026-06-27","2026-06-28","2026-06-29","2026-06-30","2026-07-01","2026-07-02","2026-07-03","2026-07-04","2026-07-05","2026-07-06","2026-07-07","2026-07-08","2026-07-09","2026-07-10","2026-07-11","2026-07-12","2026-07-13","2026-07-14","2026-07-15","2026-07-16","2026-07-17","2026-07-18","2026-07-19","2026-07-20","2026-07-21","2026-07-22","2026-07-23","2026-07-24","2026-07-25","2026-07-26","2026-07-27","2026-07-28","2026-07-29","2026-07-30","2026-07-31","2026-08-01","2026-08-02","2026-08-03","2026-08-04","2026-08-05","2026-08-06","2026-08-07","2026-08-08","2026-08-09","2026-08-10","2026-08-11","2026-08-12","2026-08-13","2026-08-14","2026-08-15","2026-08-16","2026-08-17","2026-08-18","2026-08-19","2026-08-20","2026-08-21","2026-08-22","2026-08-23","2026-08-24","2026-08-25","2026-08-26","2026-08-27","2026-08-28","2026-08-29","2026-08-30","2026-08-31","2026-09-01","2026-09-02","2026-09-03","2026-09-04","2026-09-05","2026-09-06","2026-09-07","2026-09-08","2026-09-09","2026-09-10","2026-09-11","2026-09-12","2026-09-13","2026-09-14","2026-09-15","2026-09-16","2026-09-17","2026-09-18","2026-09-19","2026-09-20","2026-09-21","2026-09-22","2026-09-23","2026-09-24","2026-09-25","2026-09-26","2026-09-27","2026-09-28","2026-09-29","2026-09-30","2026-10-01","2026-10-02","2026-10-03","2026-10-04","2026-10-05","2026-10-06","2026-10-07","2026-10-08","2026-10-09","2026-10-10","2026-10-11","2026-10-12","2026-10-13","2026-10-14","2026-10-15","2026-10-16","2026-10-17","2026-10-18","2026-10-19","2026-10-20","2026-10-21","2026-10-22","2026-10-23","2026-10-24"],"pageDays":90,"pages":3,"index":[93.28,86.87,85.85,78.0,75.36,77.84,75.62,74.34,63.22,69.89,69.08,67.67,67.77,66.84,66.18,68.18,70.87,75.17,72.35,73.36,72.57,69.78,69.12,70.53,69.91,67.62,65.36,65.56,70.49,69.14,68.02,68.95,67.26,68.94,68.88,70.93,70.13,68.01,66.5,65.7,66.92,69.17,70.57,71.5,71.88,71.67,72.68,76.3,74.87,72.29,70.95,70.83,69.34,68.9,70.91,71.87,72.17,68.89,66.73,65.87,65.21,66.02,67.48,68.06,67.59,68.4,69.08,69.01,68.84,73.04,70.98,72.46,73.87,75.69,73.23,77.48,76.48,79.41,84.04,84.97,81.29,78.33,80.57,81.72,82.57,84.02,84.39,84.47,85.55,84.47,84.84,83.29,83.73,85.37,87.34,86.88,87.44,89.66,92.77,92.92,97.71,97.62,99.97,100.01,97.26,94.72,95.93,91.22,88.58,86.89,87.95,86.22,89.36,91.58,88.01,90.99,89.14,90.82,89.49,87.38,85.6,86.57,88.09,88.73,89.9,85.26,86.86,80.82,74.67,74.4,77.85,77.74,76.88,74.56,79.02,78.82,80.91,82.75,84.45,85.73,84.59,82.68,82.89,84.31,82.31,83.0,80.89,78.72,77.5,79.17,77.57,77.44,78.78,76.5,77.99,80.75,83.52,84.52,84.77,84.81,81.56,80.0,81.27,82.2,80.76,80.12,78.69,80.69,82.75,81.37,81.32,81.53,81.56,83.15,84.02,84.03,82.75,81.92,82.22,84.08,80.5,81.19,79.39,80.26,80.15,79.65,80.52,80.83,80.54,81.41,82.55,82.05,83.38,83.48,83.84,82.66,82.34,83.32,83.82,83.58,83.33,83.34,82.62,87.94,93.09,102.8,100.75,103.82,102.34,100.25,102.43,103.62,101.07,101.91,98.35,100.84,100.72,101.79,107.84,107.08,111.33,113.42,112.64,113.2,109.12,105.36,107.99,111.47,110.45,113.42,109.38,112.29,117.3,127.49,129.58,130.37,137.97,144.03,136.15,140.89,148.61,150.55,152.83,147.08,146.77,149.11,151.12,150.07,153.21,155.93,158.32,158.16,151.51,148.93,157.33,160.33,166.29,155.11,156.21,153.13,155.91,154.9,154.17,151.64,154.89,163.65,166.21,159.76,161.95,162.67],"btc_index":[98.52,93.38,92.95,86.87,84.91,86.86,83.59,80.72,69.39,77.86,76.44,77.58,77.38,75.94,74.01,73.11,75.96,77.03,75.93,76.01,74.48,73.31,73.92,75.03,74.98,74.63,71.33,70.67,75.0,74.44,72.66,73.88,72.57,75.94,75.38,80.18,78.2,75.15,74.2,72.77,75.49,77.15,77.43,77.79,78.25,78.55,80.32,82.61,81.54,78.59,77.13,77.78,76.03,74.86,78.22,77.84,78.69,75.92,73.25,73.22,72.82,73.69,75.32,75.15,73.8,73.87,74.25,76.15,75.95,79.35,78.41,79.19,80.48,80.58,78.05,82.1,81.79,82.53,82.9,85.02,83.5,81.41,83.65,84.2,86.24,86.33,85.42,85.64,86.77,85.35,84.21,83.61,84.22,86.3,86.81,86.67,88.1,89.25,89.83,88.26,88.47,88.99,90.7,90.18,88.81,87.52,89.46,87.27,86.2,85.46,84.94,84.76,85.55,85.63,83.34,84.68,85.02,85.3,83.78,82.13,81.22,81.04,81.52,81.3,78.8,73.65,70.76,70.47,67.35,67.16,69.86,69.6,68.09,67.86,70.2,70.14,71.1,72.51,73.16,72.46,71.16,69.45,70.1,70.93,69.85,70.62,69.2,67.38,65.97,66.3,66.22,65.72,66.47,64.68,66.23,67.92,69.05,69.66,70.21,70.66,69.9,68.72,69.75,70.78,70.39,70.37,68.77,71.76,71.43,70.42,70.54,71.52,71.4,71.99,73.42,72.93,71.82,70.77,71.01,72.15,70.33,70.53,70.6,71.46,69.38,69.3,70.14,70.08,70.72,71.33,70.97,71.62,71.66,71.59,70.57,70.17,70.03,70.04,69.55,69.59,69.39,71.19,71.4,76.5,80.57,86.43,85.08,85.78,87.14,86.65,87.19,88.52,85.87,86.31,85.68,86.69,85.43,85.32,89.66,87.87,88.07,88.62,87.28,86.55,86.38,84.47,85.2,85.26,84.77,86.26,83.44,84.07,84.3,89.25,89.64,89.56,95.56,95.09,93.1,93.12,92.78,93.16,93.19,92.11,92.29,92.24,93.62,93.25,93.5,95.46,94.61,94.37,91.92,90.18,91.14,91.55,92.41,90.29,91.74,90.1,90.71,90.03,89.89,90.57,90.38,91.58,92.76,89.82,89.58,89.1],"mainstream_index":[93.32,86.65,85.3,78.12,75.64,78.16,76.64,74.89,63.59,70.73,69.99,69.17,68.83,67.07,65.86,67.51,71.91,76.53,74.21,74.87,73.92,71.42,71.13,73.12,73.08,70.77,68.27,68.57,74.5,72.58,70.95,72.13,70.85,73.05,71.79,74.81,73.47,70.83,69.4,68.23,69.84,71.05,71.77,72.8,73.2,73.55,75.01,79.29,77.93,74.69,72.88,72.95,71.28,69.99,72.54,73.46,74.11,70.97,68.62,68.58,67.89,68.6,70.1,70.53,69.2,70.12,70.68,70.8,70.12,74.51,71.97,74.42,75.71,76.32,73.63,77.22,75.25,77.4,79.91,79.7,77.14,74.64,76.31,76.9,76.78,77.01,76.98,76.8,77.57,76.44,76.01,75.01,74.83,75.75,76.69,76.62,77.61,80.81,83.68,83.27,88.27,87.81,89.96,89.39,86.86,84.69,86.09,82.89,80.56,79.76,81.19,80.55,83.29,85.46,82.17,84.97,84.24,85.37,83.84,82.49,81.21,82.39,83.74,84.47,84.53,80.49,82.69,76.66,71.46,70.22,74.19,74.42,73.54,70.55,74.49,73.4,76.25,78.44,80.01,79.99,78.83,77.01,77.85,79.44,77.11,77.59,75.58,74.39,72.91,74.36,72.51,72.08,73.23,71.51,73.22,75.7,78.3,78.04,78.74,77.95,75.69,74.48,75.34,76.75,75.93,75.89,74.49,76.96,81.21,80.17,81.19,81.98,82.13,82.83,84.33,83.66,82.63,81.68,82.64,84.92,81.64,82.55,81.12,82.94,81.93,82.03,83.54,84.26,84.72,85.01,84.49,84.26,85.0,84.82,84.87,84.97,84.19,86.0,86.76,86.34,86.53,87.33,87.37,93.5,98.39,109.98,109.78,112.96,111.44,108.5,110.26,111.65,109.03,109.42,105.88,108.7,108.85,111.88,117.44,116.57,121.78,125.42,125.7,126.89,123.13,118.24,119.03,120.37,118.77,121.48,117.97,121.5,127.1,140.04,143.74,147.19,154.68,158.29,149.04,154.21,161.09,161.86,164.06,158.92,158.52,160.13,158.5,157.37,160.0,162.49,163.59,161.12,154.8,147.0,151.58,153.99,158.22,148.12,151.72,148.13,150.46,148.78,145.81,146.12,147.3,151.38,153.61,145.56,143.04,140.77],"mainstream_label":"coin50","anchor_day":"2026-01-09","mainstream_size":50,"mainstream_used":47,"mainstream_missing":["IMX","ALGO","CAKE"],"ma":{"10":[43.3,11.8,11.8,5.5,4.7,6.3,7.1,4.7,2.4,2.4,5.5,7.1,11.8,11.8,14.2,26.8,68.5,96.1,70.9,81.9,69.3,27.6,24.4,42.5,26.8,7.1,5.5,6.3,55.9,46.5,30.7,47.2,26.8,47.2,44.1,73.2,61.4,20.5,13.4,12.6,24.4,48.0,59.8,71.7,74.0,74.8,86.6,93.7,89.8,44.9,19.7,21.1,14.8,10.2,19.5,29.7,42.2,15.6,12.5,12.5,7.0,11.7,26.6,35.9,23.4,38.3,55.5,56.2,46.9,89.1,67.2,76.6,82.0,79.7,33.6,79.7,55.5,79.7,92.2,88.3,66.4,26.6,56.2,64.1,50.8,57.0,60.2,50.4,68.2,45.7,38.8,27.1,21.7,32.6,55.8,47.3,50.4,76.7,87.6,79.8,89.1,91.5,91.5,88.4,69.0,29.5,34.9,11.6,7.0,6.2,10.9,10.1,18.6,38.8,22.5,48.8,31.8,46.5,32.6,24.8,17.8,20.9,27.1,34.9,40.3,19.4,24.8,9.3,7.0,7.0,12.4,10.1,10.1,11.6,34.1,41.1,78.5,92.3,93.8,90.0,80.8,48.5,41.5,48.5,25.4,25.4,16.9,10.8,13.1,21.5,12.3,16.9,29.2,17.7,38.5,73.1,90.0,89.2,88.5,84.7,50.4,31.3,38.9,51.9,28.8,27.3,16.7,37.9,47.7,28.8,34.8,34.1,32.6,50.0,65.9,56.1,32.6,28.0,31.1,52.3,17.4,20.5,16.7,22.7,19.7,18.2,31.1,34.1,38.6,56.8,52.3,43.9,65.2,53.8,49.2,39.4,29.5,34.1,34.1,31.8,27.3,34.1,26.5,84.1,90.9,96.2,90.9,91.7,87.1,81.8,80.3,76.5,36.4,39.4,16.7,30.3,29.5,33.3,74.2,59.8,81.8,89.4,87.1,81.2,43.6,21.6,27.6,33.6,24.6,35.8,14.1,22.2,57.8,97.0,93.3,89.6,94.1,95.6,83.0,92.6,92.6,89.6,86.7,55.6,47.4,50.4,44.4,42.2,51.9,63.7,68.1,52.6,29.6,24.4,38.5,44.7,59.5,28.7,33.6,25.2,30.0,29.9,20.5,22.5,31.3,50.8,63.4,27.3,30.1,30.7],"20":[18.1,7.9,8.7,4.7,5.5,6.3,5.5,5.5,3.9,3.9,3.1,4.7,4.7,5.5,4.7,7.1,12.6,33.9,17.3,28.3,30.7,21.3,24.4,33.9,33.1,18.1,15.0,13.4,52.0,42.5,26.8,37.8,22.0,34.6,30.7,46.5,38.6,25.2,18.1,15.0,26.0,43.3,51.2,59.1,63.0,60.6,74.8,92.1,88.2,64.6,35.4,40.2,22.0,15.7,39.4,46.5,52.8,18.9,13.4,12.6,9.4,10.9,17.2,21.9,20.3,21.9,23.4,25.8,27.3,72.7,46.9,65.6,73.4,71.9,41.4,81.2,70.3,85.9,96.1,93.8,82.0,53.9,76.6,79.7,76.6,78.9,75.8,74.2,74.2,65.6,60.2,39.8,36.7,42.2,53.1,50.0,51.6,71.3,82.9,79.8,88.4,89.1,92.2,90.7,81.4,62.8,65.9,36.4,17.8,16.3,16.3,14.7,23.3,31.0,20.9,25.6,20.9,23.3,21.7,18.6,20.9,20.2,20.9,24.0,29.5,18.6,24.0,10.1,7.8,7.8,9.3,9.3,10.1,10.1,14.0,16.3,16.3,28.7,44.2,52.7,41.1,34.1,32.6,43.4,37.2,40.3,28.5,23.1,23.1,29.2,20.8,18.5,23.8,13.8,20.8,33.8,64.6,66.2,68.5,63.8,46.9,39.2,44.6,59.2,50.0,44.6,35.4,53.8,51.5,35.9,33.6,30.5,30.5,37.4,43.9,41.7,31.1,26.5,31.8,42.4,19.7,22.0,18.2,23.5,20.5,19.7,23.5,24.2,22.7,26.5,30.3,31.1,43.2,38.6,39.4,37.9,34.1,38.6,37.1,40.9,37.1,37.1,33.3,76.5,90.9,94.7,90.9,91.7,91.7,86.4,90.9,87.9,79.5,85.6,61.4,72.0,68.9,62.1,82.6,74.2,84.1,86.4,78.0,76.5,51.5,32.6,40.2,47.0,41.7,53.8,19.7,28.8,50.8,92.5,90.2,88.8,94.0,95.5,88.1,92.5,95.6,96.3,92.6,86.7,84.4,86.7,80.7,79.3,80.7,81.5,80.7,71.1,41.5,31.1,44.4,48.5,57.3,33.3,35.0,28.9,28.7,29.9,22.2,25.0,27.8,35.2,36.6,25.0,23.3,24.1],"50":[0.0,0.0,0.0,0.0,0.0,8.7,7.1,6.3,3.2,4.8,4.8,5.6,6.3,6.3,7.1,6.3,7.9,11.8,7.9,11.8,9.4,9.4,9.4,8.7,8.7,6.3,5.5,5.5,7.1,7.9,7.1,11.0,8.7,10.2,11.8,12.6,13.4,11.0,7.9,10.2,11.8,14.2,19.7,23.6,24.4,26.0,34.6,61.4,54.3,33.9,29.1,31.5,22.8,19.7,35.4,37.8,43.3,23.6,18.1,17.3,15.7,17.3,21.3,25.2,21.3,22.8,25.2,26.8,23.6,46.5,28.3,41.7,51.2,46.5,31.5,60.6,40.9,60.6,82.7,83.5,68.5,48.0,66.9,70.9,74.0,72.4,70.9,73.2,75.6,64.6,66.1,59.4,53.9,61.7,66.4,65.6,68.8,81.2,85.2,85.2,89.8,87.5,94.5,93.0,85.9,81.2,82.8,67.2,51.6,40.6,44.5,36.7,46.9,56.2,36.7,49.2,39.8,42.2,36.7,28.9,28.1,28.9,28.1,29.7,28.1,21.1,22.7,14.0,12.4,14.0,14.7,14.7,14.0,11.6,18.6,16.3,18.6,20.9,23.3,24.8,25.6,20.9,20.2,20.2,18.6,17.1,17.1,14.7,18.6,16.3,15.5,15.5,17.1,15.5,15.5,20.9,28.7,28.7,27.9,29.5,24.0,24.0,27.9,27.9,26.4,28.7,27.1,31.0,35.7,31.8,31.8,30.2,31.8,38.0,41.1,41.9,32.3,30.0,32.3,36.2,23.1,23.8,20.0,25.4,21.5,20.0,23.8,26.2,23.8,25.4,27.7,26.9,36.9,31.5,30.0,28.5,23.8,31.5,26.2,29.8,25.2,28.2,27.5,49.6,67.4,87.9,88.6,91.7,88.6,82.6,84.1,82.6,76.5,77.3,68.2,78.0,80.3,78.8,85.6,81.1,89.4,89.4,87.9,88.6,83.3,71.2,76.5,78.0,75.8,78.0,62.1,65.9,81.1,91.7,92.4,92.4,94.7,94.7,90.9,93.2,95.5,94.7,93.9,90.9,90.2,92.4,91.7,90.2,90.2,89.4,89.4,87.1,80.3,65.9,75.0,80.6,83.6,62.6,65.7,59.8,56.5,59.5,49.1,53.4,55.8,59.1,57.1,40.5,37.1,30.9]},"top_points":[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,{"value":73.04,"strength":10.85,"freshness":"衰减","days_ago":200,"peak_age":21,"gap_pct":0.0,"pre_of":"","provisional":false},null,null,null,null,null,{"value":77.48,"strength":13.63,"freshness":"衰减","days_ago":194,"peak_age":27,"gap_pct":0.0,"pre_of":"","provisional":false},null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,{"value":92.77,"strength":10.96,"freshness":"衰减","days_ago":171,"peak_age":50,"gap_pct":0.0,"pre_of":"","provisional":false},null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,{"value":83.84,"strength":14.15,"freshness":"衰减","days_ago":75,"peak_age":55,"gap_pct":0.0,"pre_of":"","provisional":false},null,null,null,null,null,null,null,null,null,{"value":93.09,"strength":12.77,"freshness":"衰减","days_ago":65,"peak_age":46,"gap_pct":0.0,"pre_of":"","provisional":false},null,null,null,null,null,null,{"value":103.62,"strength":7.55,"freshness":"衰减","days_ago":58,"peak_age":5,"gap_pct":0.0,"pre_of":"","provisional":false},null,null,null,null,null,null,null,{"value":107.08,"strength":15.44,"freshness":"衰减","days_ago":50,"peak_age":13,"gap_pct":0.0,"pre_of":"","provisional":false},{"value":111.33,"strength":12.1,"freshness":"衰减","days_ago":49,"peak_age":13,"gap_pct":0.0,"pre_of":"","provisional":false},null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,{"value":137.97,"strength":3.48,"freshness":"衰减","days_ago":33,"peak_age":30,"gap_pct":0.0,"pre_of":"","provisional":false},null,null,null,{"value":148.61,"strength":3.57,"freshness":"衰减","days_ago":29,"peak_age":5,"gap_pct":0.0,"pre_of":"","provisional":false},null,{"value":152.83,"strength":2.94,"freshness":"衰减","days_ago":27,"peak_age":5,"gap_pct":0.0,"pre_of":"","provisional":false},null,null,null,null,null,null,null,{"value":158.32,"strength":13.56,"freshness":"衰减","days_ago":19,"peak_age":13,"gap_pct":0.0,"pre_of":"","provisional":false},null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],"bottom_points":[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,{"value":66.5,"strength":11.71,"freshness":"衰减","days_ago":231,"peak_age":29,"gap_pct":0.0,"pre_of":"","provisional":false},null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,{"value":66.73,"strength":7.37,"freshness":"衰减","days_ago":211,"peak_age":49,"gap_pct":0.0,"pre_of":"","provisional":false},null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,{"value":87.38,"strength":8.75,"freshness":"衰减","days_ago":150,"peak_age":10,"gap_pct":0.0,"pre_of":"","provisional":false},null,null,null,null,null,{"value":85.26,"strength":9.3,"freshness":"衰减","days_ago":144,"peak_age":16,"gap_pct":0.0,"pre_of":"","provisional":false},null,null,null,{"value":74.4,"strength":0.18,"freshness":"衰减","days_ago":140,"peak_age":20,"gap_pct":0.0,"pre_of":"","provisional":false},null,null,null,{"value":74.56,"strength":1.26,"freshness":"衰减","days_ago":136,"peak_age":24,"gap_pct":0.0,"pre_of":"","provisional":false},null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,{"value":77.99,"strength":8.81,"freshness":"衰减","days_ago":115,"peak_age":45,"gap_pct":0.0,"pre_of":"","provisional":false},null,null,null,null,null,null,null,null,null,null,null,{"value":78.69,"strength":4.66,"freshness":"衰减","days_ago":103,"peak_age":57,"gap_pct":0.0,"pre_of":"","provisional":false},null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,{"value":79.39,"strength":1.86,"freshness":"衰减","days_ago":87,"peak_age":53,"gap_pct":0.0,"pre_of":"","provisional":false},{"value":80.26,"strength":2.16,"freshness":"衰减","days_ago":86,"peak_age":54,"gap_pct":0.0,"pre_of":"","provisional":false},null,{"value":79.65,"strength":2.7,"freshness":"衰减","days_ago":84,"peak_age":56,"gap_pct":0.0,"pre_of":"","provisional":false},null,{"value":80.83,"strength":5.69,"freshness":"衰减","days_ago":82,"peak_age":58,"gap_pct":0.0,"pre_of":"","provisional":false},{"value":80.54,"strength":9.29,"freshness":"衰减","days_ago":81,"peak_age":59,"gap_pct":0.0,"pre_of":"","provisional":false},null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],"pre_top_points":[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,{"value":71.5,"strength":11.95,"freshness":"衰减","days_ago":226,"peak_age":24,"gap_pct":0.81,"pre_of":"","provisional":false},null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,{"value":84.02,"strength":15.81,"freshness":"衰减","days_ago":184,"peak_age":37,"gap_pct":-1.12,"pre_of":"","provisional":false},null,null,null,null,null,null,null,null,null,null,{"value":87.44,"strength":20.01,"freshness":"衰减","days_ago":173,"peak_age":48,"gap_pct":1.27,"pre_of":"2026-05-06","provisional":false},null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,{"value":83.52,"strength":12.98,"freshness":"衰减","days_ago":113,"peak_age":54,"gap_pct":1.36,"pre_of":"","provisional":false},{"value":84.52,"strength":3.27,"freshness":"衰减","days_ago":112,"peak_age":18,"gap_pct":-1.41,"pre_of":"","provisional":false},null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,{"value":84.03,"strength":16.95,"freshness":"衰减","days_ago":94,"peak_age":36,"gap_pct":-0.27,"pre_of":"","provisional":false},null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,{"value":83.38,"strength":16.99,"freshness":"衰减","days_ago":77,"peak_age":53,"gap_pct":0.94,"pre_of":"2026-08-10","provisional":false},null,null,null,null,null,null,null,null,null,null,{"value":87.94,"strength":19.27,"freshness":"衰减","days_ago":66,"peak_age":45,"gap_pct":3.5,"pre_of":"2026-08-20","provisional":false},null,null,null,null,null,null,null,null,null,{"value":101.91,"strength":20.16,"freshness":"衰减","days_ago":56,"peak_age":6,"gap_pct":-1.84,"pre_of":"2026-09-05","provisional":false},null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,{"value":129.58,"strength":5.93,"freshness":"衰减","days_ago":35,"peak_age":27,"gap_pct":1.64,"pre_of":"","provisional":false},null,null,null,null,{"value":140.89,"strength":2.27,"freshness":"衰减","days_ago":30,"peak_age":33,"gap_pct":-0.7,"pre_of":"","provisional":false},null,null,null,{"value":147.08,"strength":2.8,"freshness":"衰减","days_ago":26,"peak_age":6,"gap_pct":0.0,"pre_of":"","provisional":false},{"value":146.77,"strength":10.53,"freshness":"衰减","days_ago":25,"peak_age":7,"gap_pct":0.0,"pre_of":"","provisional":false},{"value":149.11,"strength":18.27,"freshness":"衰减","days_ago":24,"peak_age":8,"gap_pct":-1.19,"pre_of":"","provisional":false},null,null,null,{"value":155.93,"strength":21.26,"freshness":"衰减","days_ago":20,"peak_age":14,"gap_pct":1.77,"pre_of":"2026-10-05","provisional":false},null,{"value":158.16,"strength":12.95,"freshness":"衰减","days_ago":18,"peak_age":14,"gap_pct":0.0,"pre_of":"","provisional":false},{"value":151.51,"strength":15.48,"freshness":"衰减","days_ago":17,"peak_age":15,"gap_pct":0.0,"pre_of":"","provisional":false},null,null,null,null,{"value":155.11,"strength":20.61,"freshness":"中等","days_ago":12,"peak_age":22,"gap_pct":-0.93,"pre_of":"","provisional":false},null,null,null,null,null,null,null,null,null,{"value":159.76,"strength":18.97,"freshness":"新鲜","days_ago":2,"peak_age":32,"gap_pct":-1.83,"pre_of":"","provisional":false},null,null],"pre_bottom_points":[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,{"value":65.36,"strength":3.29,"freshness":"衰减","days_ago":243,"peak_age":17,"gap_pct":3.39,"pre_of":"","provisional":false},null,null,{"value":69.14,"strength":13.64,"freshness":"衰减","days_ago":240,"peak_age":20,"gap_pct":5.78,"pre_of":"2026-03-07","provisional":false},{"value":68.02,"strength":18.57,"freshness":"衰减","days_ago":239,"peak_age":21,"gap_pct":4.07,"pre_of":"2026-03-07","provisional":false},null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,{"value":69.34,"strength":4.92,"freshness":"衰减","days_ago":217,"peak_age":43,"gap_pct":5.55,"pre_of":"2026-03-27","provisional":false},null,null,null,null,null,null,null,null,null,null,null,null,null,{"value":69.08,"strength":16.56,"freshness":"衰减","days_ago":203,"peak_age":52,"gap_pct":5.93,"pre_of":"","provisional":false},null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,{"value":83.29,"strength":10.66,"freshness":"衰减","days_ago":178,"peak_age":30,"gap_pct":5.33,"pre_of":"","provisional":false},null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,{"value":88.58,"strength":0.54,"freshness":"衰减","days_ago":161,"peak_age":47,"gap_pct":5.29,"pre_of":"","provisional":false},null,null,null,null,null,{"value":88.01,"strength":9.47,"freshness":"衰减","days_ago":155,"peak_age":5,"gap_pct":2.26,"pre_of":"","provisional":false},{"value":90.99,"strength":11.57,"freshness":"衰减","days_ago":154,"peak_age":5,"gap_pct":5.54,"pre_of":"","provisional":false},null,null,null,null,null,{"value":86.57,"strength":6.08,"freshness":"衰减","days_ago":148,"peak_age":12,"gap_pct":1.86,"pre_of":"","provisional":false},{"value":88.09,"strength":5.24,"freshness":"衰减","days_ago":147,"peak_age":13,"gap_pct":4.21,"pre_of":"","provisional":false},{"value":88.73,"strength":8.37,"freshness":"衰减","days_ago":146,"peak_age":14,"gap_pct":5.18,"pre_of":"","provisional":false},null,null,{"value":86.86,"strength":9.22,"freshness":"衰减","days_ago":143,"peak_age":17,"gap_pct":2.76,"pre_of":"","provisional":false},null,null,null,null,null,null,null,null,{"value":78.82,"strength":7.62,"freshness":"衰减","days_ago":134,"peak_age":6,"gap_pct":5.94,"pre_of":"","provisional":false},null,null,null,null,null,null,null,null,null,null,null,{"value":78.72,"strength":2.06,"freshness":"衰减","days_ago":122,"peak_age":18,"gap_pct":5.82,"pre_of":"2026-07-01","provisional":false},null,null,null,{"value":77.44,"strength":3.71,"freshness":"衰减","days_ago":118,"peak_age":42,"gap_pct":5.55,"pre_of":"2026-07-01","provisional":false},null,null,null,null,null,null,null,null,null,null,{"value":81.27,"strength":12.77,"freshness":"衰减","days_ago":107,"peak_age":53,"gap_pct":5.7,"pre_of":"2026-07-13","provisional":false},null,{"value":80.76,"strength":13.28,"freshness":"衰减","days_ago":105,"peak_age":35,"gap_pct":5.56,"pre_of":"","provisional":false},null,null,null,null,null,null,null,null,null,null,null,null,{"value":81.92,"strength":13.07,"freshness":"衰减","days_ago":92,"peak_age":47,"gap_pct":5.71,"pre_of":"","provisional":false},null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,{"value":82.66,"strength":14.88,"freshness":"衰减","days_ago":74,"peak_age":47,"gap_pct":4.12,"pre_of":"","provisional":false},{"value":82.34,"strength":11.31,"freshness":"衰减","days_ago":73,"peak_age":48,"gap_pct":4.27,"pre_of":"","provisional":false},null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,{"value":154.9,"strength":0.64,"freshness":"中等","days_ago":8,"peak_age":30,"gap_pct":5.97,"pre_of":"","provisional":false},{"value":154.17,"strength":0.17,"freshness":"中等","days_ago":7,"peak_age":31,"gap_pct":5.98,"pre_of":"","provisional":false},null,null,null,null,null,null,null],"mainstream_top_points":[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,{"value":74.51,"strength":9.95,"freshness":"衰减","days_ago":200,"peak_age":21,"gap_pct":0.0,"pre_of":"","provisional":false},null,null,null,null,null,{"value":77.22,"strength":14.62,"freshness":"衰减","days_ago":194,"peak_age":27,"gap_pct":0.0,"pre_of":"","provisional":false},null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,{"value":80.81,"strength":15.75,"freshness":"衰减","days_ago":172,"peak_age":49,"gap_pct":0.0,"pre_of":"","provisional":false},null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,{"value":83.66,"strength":14.27,"freshness":"衰减","days_ago":94,"peak_age":36,"gap_pct":0.0,"pre_of":"","provisional":false},null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,{"value":110.26,"strength":3.31,"freshness":"衰减","days_ago":59,"peak_age":5,"gap_pct":0.0,"pre_of":"","provisional":false},{"value":111.65,"strength":5.9,"freshness":"衰减","days_ago":58,"peak_age":6,"gap_pct":0.0,"pre_of":"","provisional":false},null,null,null,null,null,null,null,{"value":116.57,"strength":17.27,"freshness":"衰减","days_ago":50,"peak_age":14,"gap_pct":0.0,"pre_of":"","provisional":false},null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,{"value":164.06,"strength":5.79,"freshness":"衰减","days_ago":27,"peak_age":5,"gap_pct":0.0,"pre_of":"","provisional":false},null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],"mainstream_bottom_points":[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,{"value":69.4,"strength":8.77,"freshness":"衰减","days_ago":231,"peak_age":29,"gap_pct":0.0,"pre_of":"","provisional":false},null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,{"value":68.62,"strength":7.9,"freshness":"衰减","days_ago":211,"peak_age":49,"gap_pct":0.0,"pre_of":"","provisional":false},null,null,null,null,null,{"value":69.2,"strength":8.92,"freshness":"衰减","days_ago":205,"peak_age":55,"gap_pct":0.0,"pre_of":"","provisional":false},null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,{"value":75.01,"strength":11.72,"freshness":"衰减","days_ago":178,"peak_age":52,"gap_pct":0.0,"pre_of":"","provisional":false},null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,{"value":81.21,"strength":7.33,"freshness":"衰减","days_ago":149,"peak_age":11,"gap_pct":0.0,"pre_of":"","provisional":false},null,null,null,null,{"value":80.49,"strength":10.77,"freshness":"衰减","days_ago":144,"peak_age":16,"gap_pct":0.0,"pre_of":"","provisional":false},null,null,{"value":71.46,"strength":5.43,"freshness":"衰减","days_ago":141,"peak_age":19,"gap_pct":0.0,"pre_of":"","provisional":false},null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,{"value":71.51,"strength":7.38,"freshness":"衰减","days_ago":116,"peak_age":22,"gap_pct":0.0,"pre_of":"","provisional":false},null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],"mainstream_pre_top_points":[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,{"value":73.55,"strength":5.83,"freshness":"衰减","days_ago":224,"peak_age":26,"gap_pct":-1.68,"pre_of":"","provisional":false},null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,{"value":78.3,"strength":14.11,"freshness":"衰减","days_ago":113,"peak_age":54,"gap_pct":-0.95,"pre_of":"","provisional":false},null,{"value":78.74,"strength":2.8,"freshness":"衰减","days_ago":111,"peak_age":56,"gap_pct":-1.58,"pre_of":"","provisional":false},null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,{"value":84.33,"strength":19.37,"freshness":"衰减","days_ago":95,"peak_age":35,"gap_pct":1.51,"pre_of":"2026-07-22","provisional":false},null,null,null,null,null,null,null,null,null,null,null,null,null,{"value":84.72,"strength":20.74,"freshness":"衰减","days_ago":81,"peak_age":49,"gap_pct":-0.24,"pre_of":"","provisional":false},null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,{"value":117.44,"strength":25.39,"freshness":"衰减","days_ago":51,"peak_age":13,"gap_pct":3.97,"pre_of":"2026-09-04","provisional":false},null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,{"value":143.74,"strength":7.9,"freshness":"衰减","days_ago":35,"peak_age":29,"gap_pct":3.8,"pre_of":"2026-09-27","provisional":false},null,null,null,null,null,null,null,null,{"value":158.92,"strength":9.5,"freshness":"衰减","days_ago":26,"peak_age":6,"gap_pct":0.0,"pre_of":"","provisional":false},{"value":158.52,"strength":16.49,"freshness":"衰减","days_ago":25,"peak_age":7,"gap_pct":0.0,"pre_of":"","provisional":false},null,null,null,null,null,{"value":163.59,"strength":20.98,"freshness":"衰减","days_ago":19,"peak_age":13,"gap_pct":-0.63,"pre_of":"2026-10-06","provisional":false},{"value":161.12,"strength":17.44,"freshness":"衰减","days_ago":18,"peak_age":14,"gap_pct":0.0,"pre_of":"","provisional":false},null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],"mainstream_pre_bottom_points":[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,{"value":71.28,"strength":4.42,"freshness":"衰减","days_ago":217,"peak_age":43,"gap_pct":4.49,"pre_of":"","provisional":false},null,null,null,null,null,null,null,null,null,null,null,null,null,{"value":70.68,"strength":14.98,"freshness":"衰减","days_ago":203,"peak_age":52,"gap_pct":4.11,"pre_of":"","provisional":false},null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,{"value":76.31,"strength":18.36,"freshness":"衰减","days_ago":187,"peak_age":55,"gap_pct":1.81,"pre_of":"2026-04-29","provisional":false},null,null,null,null,null,null,null,{"value":76.01,"strength":15.71,"freshness":"衰减","days_ago":179,"peak_age":51,"gap_pct":5.61,"pre_of":"2026-04-29","provisional":false},null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,{"value":80.56,"strength":3.69,"freshness":"衰减","days_ago":161,"peak_age":48,"gap_pct":4.52,"pre_of":"","provisional":false},null,null,null,null,null,{"value":82.17,"strength":10.27,"freshness":"衰减","days_ago":155,"peak_age":5,"gap_pct":5.15,"pre_of":"","provisional":false},null,null,null,{"value":83.84,"strength":14.85,"freshness":"衰减","days_ago":151,"peak_age":9,"gap_pct":5.12,"pre_of":"","provisional":false},null,null,{"value":82.39,"strength":5.9,"freshness":"衰减","days_ago":148,"peak_age":12,"gap_pct":2.1,"pre_of":"2026-06-05","provisional":false},{"value":83.74,"strength":5.17,"freshness":"衰减","days_ago":147,"peak_age":13,"gap_pct":4.25,"pre_of":"2026-06-05","provisional":false},{"value":84.47,"strength":7.69,"freshness":"衰减","days_ago":146,"peak_age":14,"gap_pct":4.76,"pre_of":"2026-06-05","provisional":false},{"value":84.53,"strength":10.87,"freshness":"衰减","days_ago":145,"peak_age":15,"gap_pct":4.64,"pre_of":"2026-06-05","provisional":false},null,{"value":82.69,"strength":11.1,"freshness":"衰减","days_ago":143,"peak_age":17,"gap_pct":2.8,"pre_of":"2026-06-05","provisional":false},null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,{"value":74.39,"strength":3.53,"freshness":"衰减","days_ago":122,"peak_age":16,"gap_pct":5.92,"pre_of":"2026-06-30","provisional":false},null,null,{"value":72.51,"strength":3.15,"freshness":"衰减","days_ago":119,"peak_age":19,"gap_pct":3.17,"pre_of":"","provisional":false},null,null,null,null,null,null,null,null,null,null,null,{"value":75.34,"strength":18.41,"freshness":"衰减","days_ago":107,"peak_age":31,"gap_pct":5.98,"pre_of":"","provisional":false},null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,{"value":84.49,"strength":21.31,"freshness":"衰减","days_ago":79,"peak_age":59,"gap_pct":3.26,"pre_of":"","provisional":false},{"value":84.26,"strength":20.7,"freshness":"衰减","days_ago":78,"peak_age":60,"gap_pct":3.87,"pre_of":"","provisional":false},null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,{"value":151.38,"strength":5.6,"freshness":"新鲜","days_ago":4,"peak_age":6,"gap_pct":3.81,"pre_of":"","provisional":false},null,null,null,null],"macd":{"fast":[25.2,3.94,3.15,0.79,-0.79,0.0,1.57,-0.79,-1.57,-1.57,2.36,2.36,7.09,6.3,9.45,19.69,55.91,62.2,53.54,53.54,38.58,6.3,0.0,8.66,-6.3,-11.02,-9.45,-7.09,3.94,3.94,3.94,9.45,4.72,12.6,13.39,26.77,22.83,-4.72,-4.72,-2.36,-1.57,4.72,8.66,12.6,11.02,14.17,11.81,1.57,1.57,-19.69,-15.75,-19.06,-7.2,-5.59,-19.84,-16.77,-10.57,-3.27,-0.89,-0.1,-2.42,0.78,9.38,14.06,3.12,16.41,32.03,30.47,19.53,16.41,20.31,10.94,8.59,7.81,-7.81,-1.56,-14.84,-6.25,-3.91,-5.47,-15.62,-27.34,-20.31,-15.62,-25.78,-21.88,-15.62,-23.83,-6.0,-19.89,-21.4,-12.71,-15.01,-9.63,2.69,-2.71,-1.17,5.43,4.65,0.0,0.78,2.33,-0.78,-2.33,-12.4,-33.33,-31.01,-24.81,-10.85,-10.08,-5.43,-4.65,-4.65,7.75,1.55,23.26,10.85,23.26,10.85,6.2,-3.1,0.78,6.2,10.85,10.85,0.78,0.78,-0.78,-0.78,-0.78,3.1,0.78,0.0,1.55,20.16,24.81,62.18,63.63,49.66,37.29,39.68,14.35,8.98,5.05,-11.82,-14.93,-11.54,-12.31,-10.0,-7.69,-8.46,-1.54,5.38,3.85,17.69,39.23,25.38,23.08,20.0,20.89,3.46,-7.93,-5.68,-7.32,-21.21,-17.34,-18.72,-15.97,-3.81,-7.09,1.26,3.56,2.04,12.6,21.97,14.39,1.52,1.52,-0.76,9.85,-2.27,-1.52,-1.52,-0.76,-0.76,-1.52,7.58,9.85,15.91,30.3,21.97,12.88,21.97,15.15,9.85,1.52,-4.55,-4.55,-3.03,-9.09,-9.85,-3.03,-6.82,7.58,0.0,1.52,0.0,0.0,-4.55,-4.55,-10.61,-11.36,-43.18,-46.21,-44.7,-41.67,-39.39,-28.79,-8.33,-14.39,-2.27,3.03,9.09,4.69,-7.91,-10.93,-12.54,-13.39,-17.04,-17.97,-5.62,-6.57,7.02,4.56,3.11,0.82,0.04,0.03,-5.1,0.06,-2.96,-6.67,-5.93,-31.11,-37.04,-36.3,-36.3,-37.04,-28.89,-17.78,-12.59,-18.52,-11.85,-6.67,-5.93,-3.79,2.29,-4.67,-1.4,-3.7,1.33,0.0,-1.71,-2.5,3.48,15.62,26.87,2.27,6.77,6.57],"signal":[null,null,null,null,null,null,null,null,null,3.13,2.98,2.85,3.7,4.22,5.27,8.15,17.7,26.6,31.99,36.3,36.76,30.67,24.53,21.36,15.83,10.46,6.48,3.76,3.8,3.83,3.85,4.97,4.92,6.46,7.84,11.63,13.87,10.15,7.18,5.27,3.9,4.06,4.98,6.51,7.41,8.76,9.37,7.81,6.57,1.32,-2.1,-5.49,-5.83,-5.78,-8.6,-10.23,-10.3,-8.89,-7.29,-5.85,-5.17,-3.98,-1.31,1.77,2.04,4.91,10.34,14.36,15.4,15.6,16.54,15.42,14.06,12.81,8.68,6.63,2.34,0.62,-0.28,-1.32,-4.18,-8.81,-11.11,-12.02,-14.77,-16.19,-16.08,-17.63,-15.3,-16.22,-17.26,-16.35,-16.08,-14.79,-11.29,-9.58,-7.9,-5.23,-3.26,-2.6,-1.93,-1.08,-1.02,-1.28,-3.5,-9.47,-13.78,-15.98,-14.96,-13.98,-12.27,-10.75,-9.53,-6.07,-4.55,1.01,2.98,7.04,7.8,7.48,5.36,4.45,4.8,6.01,6.98,5.74,4.74,3.64,2.76,2.05,2.26,1.96,1.57,1.57,5.28,9.19,19.79,28.56,32.78,33.68,34.88,30.77,26.42,22.14,15.35,9.29,5.13,1.64,-0.69,-2.09,-3.36,-3.0,-1.32,-0.29,3.31,10.49,13.47,15.39,16.31,17.23,14.47,9.99,6.86,4.02,-1.03,-4.29,-7.17,-8.93,-7.91,-7.74,-5.94,-4.04,-2.83,0.26,4.6,6.56,5.55,4.74,3.64,4.88,3.45,2.46,1.66,1.18,0.79,0.33,1.78,3.39,5.9,10.78,13.02,12.99,14.78,14.86,13.86,11.39,8.2,5.65,3.92,1.31,-0.92,-1.34,-2.44,-0.43,-0.35,0.03,0.02,0.02,-0.9,-1.63,-3.42,-5.01,-12.64,-19.36,-24.43,-27.87,-30.18,-29.9,-25.59,-23.35,-19.13,-14.7,-9.94,-7.02,-7.19,-7.94,-8.86,-9.77,-11.22,-12.57,-11.18,-10.26,-6.8,-4.53,-3.0,-2.24,-1.78,-1.42,-2.15,-1.71,-1.96,-2.9,-3.51,-9.03,-14.63,-18.96,-22.43,-25.35,-26.06,-24.4,-22.04,-21.34,-19.44,-16.88,-14.69,-12.51,-9.55,-8.57,-7.14,-6.45,-4.9,-3.92,-3.47,-3.28,-1.93,1.58,6.64,5.77,5.97,6.09],"hist":[null,null,null,null,null,null,null,null,null,-4.7,-0.61,-0.49,3.39,2.08,4.18,11.54,38.2,35.6,21.55,17.24,1.83,-24.37,-24.53,-12.7,-22.13,-21.48,-15.92,-10.85,0.14,0.11,0.09,4.48,-0.19,6.14,5.54,15.14,8.97,-14.87,-11.9,-7.63,-5.47,0.66,3.68,6.09,3.61,5.41,2.44,-6.24,-4.99,-21.0,-13.65,-13.57,-1.37,0.19,-11.24,-6.54,-0.27,5.62,6.41,5.75,2.75,4.76,10.68,12.29,1.09,11.49,21.7,16.11,4.13,0.81,3.77,-4.48,-5.46,-4.99,-16.5,-8.2,-17.18,-6.87,-3.62,-4.15,-11.44,-18.53,-9.2,-3.61,-11.01,-5.68,0.45,-6.2,9.3,-3.67,-4.14,3.63,1.07,5.16,13.98,6.86,6.72,10.66,7.91,2.6,2.7,3.4,0.24,-1.05,-8.9,-23.86,-17.23,-8.82,4.1,3.9,6.84,6.1,4.88,13.82,6.1,22.24,7.87,16.22,3.05,-1.28,-8.46,-3.67,1.4,4.84,3.88,-4.96,-3.97,-4.42,-3.53,-2.83,0.84,-1.19,-1.57,-0.02,14.87,15.62,42.39,35.07,16.88,3.61,4.8,-16.42,-17.43,-17.09,-27.17,-24.22,-16.67,-13.95,-9.31,-5.6,-5.1,1.46,6.71,4.13,14.38,28.74,11.91,7.68,3.69,3.66,-11.02,-17.93,-12.54,-11.34,-20.19,-13.05,-11.54,-7.03,4.1,0.65,7.2,7.6,4.87,12.34,17.37,7.84,-4.03,-3.23,-4.4,4.96,-5.73,-3.97,-3.18,-1.94,-1.55,-1.85,5.8,6.45,10.01,19.53,8.95,-0.11,7.18,0.29,-4.01,-9.87,-12.75,-10.2,-6.95,-10.41,-8.93,-1.69,-4.38,8.01,0.35,1.49,-0.02,-0.02,-3.65,-2.92,-7.18,-6.35,-30.54,-26.85,-20.27,-13.79,-9.22,1.11,17.25,8.95,16.86,17.73,19.03,11.7,-0.71,-2.99,-3.68,-3.62,-5.82,-5.4,5.56,3.69,13.82,9.09,6.11,3.06,1.83,1.45,-2.94,1.77,-1.0,-3.76,-2.42,-22.08,-22.41,-17.33,-13.87,-11.69,-2.83,6.62,9.45,2.82,7.59,10.22,8.77,8.72,11.84,3.91,5.74,2.75,6.23,3.92,1.77,0.78,5.41,14.04,20.23,-3.49,0.8,0.48],"period":9,"periods":[10,20]},"k_macd":{"fast":[0.0,-0.56,-1.05,-2.07,-3.02,-3.46,-3.91,-4.29,-5.46,-5.66,-5.77,-5.88,-5.85,-5.81,-5.73,-5.4,-4.83,-3.96,-3.48,-2.98,-2.63,-2.57,-2.53,-2.34,-2.21,-2.27,-2.48,-2.57,-2.16,-1.95,-1.85,-1.66,-1.64,-1.45,-1.29,-0.97,-0.79,-0.82,-0.97,-1.12,-1.12,-0.9,-0.6,-0.28,-0.01,0.17,0.39,0.86,1.06,0.98,0.78,0.61,0.34,0.1,0.1,0.17,0.25,0.02,-0.33,-0.67,-0.96,-1.09,-1.04,-0.93,-0.88,-0.76,-0.59,-0.47,-0.38,0.05,0.2,0.43,0.71,1.07,1.1,1.47,1.64,1.98,2.61,3.1,3.1,2.79,2.7,2.69,2.71,2.8,2.85,2.85,2.89,2.78,2.68,2.42,2.23,2.19,2.29,2.29,2.3,2.46,2.8,3.02,3.54,3.86,4.23,4.44,4.28,3.86,3.6,2.93,2.15,1.39,0.9,0.37,0.24,0.34,0.09,0.17,0.06,0.12,0.06,-0.18,-0.5,-0.65,-0.62,-0.53,-0.35,-0.61,-0.66,-1.21,-2.12,-2.79,-2.93,-3.0,-3.07,-3.27,-2.98,-2.72,-2.31,-1.8,-1.25,-0.71,-0.39,-0.32,-0.24,-0.05,-0.09,-0.05,-0.21,-0.51,-0.83,-0.9,-1.08,-1.21,-1.16,-1.31,-1.27,-0.97,-0.5,-0.05,0.3,0.56,0.46,0.25,0.19,0.23,0.13,-0.01,-0.23,-0.22,-0.02,-0.0,0.01,0.04,0.06,0.21,0.4,0.53,0.51,0.41,0.36,0.47,0.24,0.12,-0.12,-0.23,-0.31,-0.41,-0.4,-0.36,-0.35,-0.26,-0.09,-0.0,0.17,0.31,0.44,0.42,0.38,0.42,0.49,0.51,0.49,0.48,0.39,0.78,1.5,2.85,3.63,4.4,4.77,4.78,4.89,4.99,4.76,4.58,4.06,3.82,3.56,3.4,3.75,3.88,4.27,4.67,4.82,4.89,4.51,3.82,3.48,3.46,3.3,3.38,3.03,2.98,3.32,4.39,5.29,5.94,6.97,8.14,8.18,8.48,9.22,9.78,10.22,9.87,9.42,9.12,8.92,8.52,8.35,8.31,8.35,8.22,7.41,6.45,6.36,6.44,6.91,6.17,5.6,4.82,4.4,3.93,3.45,2.81,2.57,3.11,3.68,3.47,3.45,3.44],"signal":[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,-2.47,-2.48,-2.51,-2.39,-2.24,-2.11,-1.96,-1.85,-1.72,-1.58,-1.38,-1.18,-1.06,-1.03,-1.06,-1.08,-1.02,-0.88,-0.68,-0.46,-0.25,-0.04,0.26,0.53,0.68,0.71,0.68,0.57,0.41,0.31,0.26,0.26,0.18,0.01,-0.22,-0.46,-0.67,-0.79,-0.84,-0.85,-0.82,-0.74,-0.65,-0.56,-0.36,-0.17,0.03,0.26,0.53,0.72,0.97,1.19,1.46,1.84,2.26,2.54,2.62,2.65,2.66,2.68,2.72,2.76,2.79,2.82,2.81,2.76,2.65,2.51,2.4,2.37,2.34,2.33,2.37,2.51,2.68,2.97,3.27,3.59,3.87,4.01,3.96,3.84,3.53,3.07,2.51,1.98,1.44,1.04,0.81,0.57,0.44,0.31,0.25,0.18,0.06,-0.13,-0.3,-0.41,-0.45,-0.42,-0.48,-0.54,-0.76,-1.22,-1.74,-2.14,-2.42,-2.64,-2.85,-2.89,-2.84,-2.66,-2.37,-2.0,-1.57,-1.18,-0.89,-0.67,-0.47,-0.34,-0.25,-0.23,-0.33,-0.49,-0.63,-0.78,-0.92,-1.0,-1.11,-1.16,-1.1,-0.9,-0.61,-0.31,-0.02,0.14,0.18,0.18,0.2,0.17,0.11,-0.0,-0.07,-0.06,-0.04,-0.02,-0.0,0.02,0.08,0.19,0.3,0.37,0.38,0.37,0.41,0.35,0.27,0.14,0.02,-0.09,-0.2,-0.26,-0.29,-0.31,-0.29,-0.22,-0.15,-0.04,0.08,0.2,0.27,0.31,0.34,0.39,0.43,0.45,0.46,0.44,0.55,0.87,1.53,2.23,2.95,3.56,3.97,4.27,4.51,4.6,4.59,4.41,4.22,4.0,3.8,3.78,3.82,3.97,4.2,4.41,4.57,4.55,4.31,4.03,3.84,3.66,3.57,3.39,3.25,3.27,3.65,4.2,4.78,5.51,6.38,6.98,7.48,8.06,8.63,9.16,9.4,9.4,9.31,9.18,8.96,8.76,8.61,8.52,8.42,8.08,7.54,7.15,6.91,6.91,6.66,6.31,5.81,5.34,4.87,4.4,3.87,3.44,3.33,3.44,3.45,3.45,3.45],"hist":[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,0.2,-0.0,-0.06,0.23,0.3,0.26,0.3,0.21,0.27,0.29,0.4,0.39,0.24,0.06,-0.06,-0.04,0.12,0.28,0.4,0.44,0.42,0.42,0.59,0.54,0.3,0.07,-0.07,-0.22,-0.31,-0.21,-0.09,-0.01,-0.16,-0.34,-0.45,-0.5,-0.42,-0.24,-0.09,-0.03,0.07,0.15,0.19,0.18,0.41,0.37,0.4,0.46,0.54,0.38,0.5,0.45,0.53,0.77,0.84,0.56,0.16,0.05,0.03,0.03,0.08,0.09,0.06,0.07,-0.03,-0.09,-0.23,-0.28,-0.21,-0.07,-0.05,-0.03,0.09,0.29,0.34,0.57,0.6,0.65,0.57,0.27,-0.1,-0.24,-0.61,-0.92,-1.12,-1.07,-1.07,-0.8,-0.47,-0.48,-0.27,-0.25,-0.12,-0.13,-0.24,-0.38,-0.35,-0.21,-0.08,0.06,-0.13,-0.12,-0.44,-0.91,-1.05,-0.79,-0.57,-0.43,-0.42,-0.08,0.11,0.35,0.57,0.75,0.86,0.78,0.57,0.43,0.41,0.25,0.19,0.02,-0.18,-0.33,-0.27,-0.3,-0.29,-0.16,-0.2,-0.11,0.13,0.4,0.56,0.61,0.58,0.32,0.07,0.01,0.03,-0.05,-0.12,-0.23,-0.14,0.03,0.04,0.03,0.04,0.04,0.13,0.21,0.23,0.14,0.03,-0.02,0.06,-0.11,-0.15,-0.26,-0.25,-0.22,-0.21,-0.13,-0.06,-0.03,0.04,0.14,0.15,0.22,0.24,0.24,0.15,0.07,0.08,0.1,0.08,0.04,0.02,-0.05,0.23,0.63,1.32,1.4,1.45,1.21,0.81,0.62,0.48,0.17,-0.01,-0.35,-0.4,-0.43,-0.4,-0.03,0.06,0.31,0.47,0.41,0.32,-0.04,-0.48,-0.55,-0.38,-0.36,-0.19,-0.36,-0.28,0.04,0.75,1.1,1.16,1.46,1.75,1.2,1.0,1.16,1.15,1.06,0.47,0.01,-0.19,-0.26,-0.44,-0.41,-0.29,-0.17,-0.2,-0.68,-1.09,-0.79,-0.47,-0.0,-0.5,-0.71,-0.99,-0.94,-0.94,-0.95,-1.06,-0.86,-0.22,0.23,0.02,-0.0,-0.01],"periods":[10,20,5],"warmup":25},"k50_macd":{"fast":[0.0,-0.58,-1.11,-2.11,-3.03,-3.43,-3.81,-4.17,-5.35,-5.5,-5.59,-5.63,-5.59,-5.62,-5.64,-5.42,-4.78,-3.83,-3.26,-2.72,-2.36,-2.26,-2.18,-1.91,-1.68,-1.68,-1.87,-1.95,-1.46,-1.24,-1.2,-1.04,-1.02,-0.8,-0.73,-0.4,-0.27,-0.39,-0.6,-0.85,-0.88,-0.78,-0.63,-0.42,-0.22,-0.04,0.22,0.78,1.06,0.97,0.73,0.55,0.26,-0.07,-0.1,-0.03,0.07,-0.12,-0.47,-0.72,-0.95,-1.05,-0.97,-0.86,-0.88,-0.8,-0.67,-0.56,-0.53,-0.11,-0.02,0.26,0.57,0.84,0.8,1.06,1.07,1.24,1.57,1.76,1.65,1.33,1.21,1.15,1.08,1.02,0.97,0.89,0.88,0.77,0.63,0.43,0.26,0.21,0.25,0.27,0.36,0.7,1.19,1.5,2.13,2.53,2.96,3.18,3.07,2.74,2.58,2.13,1.57,1.05,0.77,0.5,0.52,0.72,0.57,0.69,0.71,0.8,0.73,0.54,0.29,0.19,0.24,0.33,0.4,0.09,0.05,-0.5,-1.35,-2.06,-2.21,-2.26,-2.34,-2.61,-2.43,-2.34,-2.0,-1.51,-0.99,-0.59,-0.39,-0.39,-0.31,-0.1,-0.15,-0.15,-0.31,-0.53,-0.81,-0.88,-1.08,-1.24,-1.24,-1.37,-1.29,-1.0,-0.54,-0.21,0.1,0.25,0.17,-0.0,-0.05,0.03,0.03,0.01,-0.11,0.01,0.46,0.7,0.96,1.2,1.37,1.53,1.75,1.83,1.77,1.61,1.54,1.67,1.45,1.34,1.11,1.08,0.95,0.85,0.88,0.96,1.04,1.11,1.09,1.04,1.05,1.02,0.99,0.96,0.85,0.91,1.0,1.02,1.03,1.09,1.12,1.65,2.44,3.99,5.05,6.02,6.5,6.49,6.52,6.56,6.24,5.93,5.29,4.97,4.66,4.61,4.98,5.09,5.53,6.08,6.41,6.64,6.37,5.64,5.07,4.67,4.16,3.94,3.41,3.26,3.58,4.88,6.07,7.15,8.47,9.62,9.5,9.69,10.26,10.58,10.81,10.36,9.81,9.37,8.74,8.03,7.59,7.34,7.13,6.64,5.61,4.08,3.27,2.83,2.81,1.88,1.47,0.83,0.54,0.17,-0.36,-0.72,-0.87,-0.62,-0.22,-0.63,-1.13,-1.68],"signal":[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,-2.01,-1.96,-1.96,-1.79,-1.61,-1.47,-1.33,-1.22,-1.08,-0.96,-0.77,-0.61,-0.53,-0.56,-0.65,-0.73,-0.74,-0.71,-0.61,-0.48,-0.33,-0.15,0.16,0.46,0.63,0.67,0.63,0.5,0.31,0.18,0.11,0.1,0.02,-0.14,-0.33,-0.54,-0.71,-0.8,-0.82,-0.84,-0.82,-0.77,-0.7,-0.64,-0.47,-0.32,-0.13,0.11,0.35,0.5,0.69,0.82,0.96,1.16,1.36,1.46,1.42,1.35,1.28,1.21,1.15,1.09,1.02,0.98,0.91,0.81,0.69,0.54,0.43,0.37,0.34,0.35,0.47,0.71,0.97,1.36,1.75,2.15,2.49,2.68,2.7,2.66,2.48,2.18,1.8,1.46,1.14,0.93,0.86,0.77,0.74,0.73,0.75,0.75,0.68,0.55,0.43,0.36,0.35,0.37,0.27,0.2,-0.03,-0.47,-1.0,-1.4,-1.69,-1.91,-2.14,-2.24,-2.27,-2.18,-1.96,-1.64,-1.29,-0.99,-0.79,-0.63,-0.45,-0.35,-0.28,-0.29,-0.37,-0.52,-0.64,-0.79,-0.94,-1.04,-1.15,-1.2,-1.13,-0.93,-0.69,-0.43,-0.2,-0.08,-0.05,-0.05,-0.02,-0.01,-0.0,-0.04,-0.02,0.14,0.33,0.54,0.76,0.96,1.15,1.35,1.51,1.6,1.6,1.58,1.61,1.56,1.48,1.36,1.26,1.16,1.05,1.0,0.99,1.0,1.04,1.06,1.05,1.05,1.04,1.02,1.0,0.95,0.94,0.96,0.98,1.0,1.03,1.06,1.26,1.65,2.43,3.3,4.21,4.97,5.48,5.83,6.07,6.13,6.06,5.8,5.53,5.24,5.03,5.01,5.04,5.2,5.5,5.8,6.08,6.18,6.0,5.69,5.35,4.95,4.62,4.22,3.9,3.79,4.16,4.79,5.58,6.54,7.57,8.21,8.7,9.22,9.67,10.05,10.16,10.04,9.82,9.46,8.98,8.52,8.13,7.79,7.41,6.81,5.9,5.02,4.29,3.8,3.16,2.59,2.0,1.52,1.07,0.59,0.15,-0.19,-0.33,-0.3,-0.41,-0.65,-0.99],"hist":[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,0.33,0.1,0.01,0.33,0.37,0.27,0.29,0.21,0.29,0.24,0.38,0.34,0.14,-0.05,-0.19,-0.15,-0.03,0.08,0.19,0.26,0.29,0.37,0.62,0.6,0.34,0.07,-0.08,-0.25,-0.38,-0.27,-0.14,-0.02,-0.15,-0.33,-0.39,-0.41,-0.34,-0.17,-0.04,-0.04,0.03,0.1,0.14,0.12,0.35,0.3,0.38,0.46,0.49,0.3,0.38,0.26,0.29,0.41,0.4,0.19,-0.09,-0.14,-0.13,-0.14,-0.13,-0.12,-0.13,-0.09,-0.14,-0.18,-0.26,-0.28,-0.22,-0.12,-0.07,0.02,0.24,0.49,0.53,0.77,0.78,0.81,0.68,0.38,0.04,-0.08,-0.35,-0.61,-0.75,-0.69,-0.64,-0.41,-0.14,-0.19,-0.05,-0.02,0.05,-0.02,-0.14,-0.26,-0.24,-0.13,-0.02,0.03,-0.18,-0.15,-0.47,-0.88,-1.06,-0.81,-0.57,-0.43,-0.47,-0.19,-0.07,0.18,0.44,0.64,0.7,0.6,0.4,0.32,0.35,0.2,0.14,-0.02,-0.16,-0.29,-0.24,-0.29,-0.3,-0.2,-0.22,-0.1,0.13,0.4,0.48,0.53,0.46,0.25,0.05,0.0,0.06,0.03,0.01,-0.08,0.03,0.32,0.38,0.42,0.44,0.41,0.38,0.4,0.32,0.17,0.01,-0.04,0.06,-0.11,-0.15,-0.25,-0.19,-0.21,-0.21,-0.11,-0.02,0.04,0.07,0.04,-0.01,-0.0,-0.02,-0.03,-0.05,-0.1,-0.03,0.05,0.04,0.04,0.06,0.06,0.4,0.79,1.56,1.74,1.81,1.53,1.01,0.7,0.49,0.11,-0.13,-0.51,-0.55,-0.58,-0.42,-0.03,0.05,0.33,0.59,0.61,0.56,0.19,-0.36,-0.62,-0.68,-0.79,-0.67,-0.8,-0.63,-0.21,0.72,1.28,1.57,1.93,2.05,1.29,0.99,1.04,0.9,0.76,0.2,-0.23,-0.45,-0.72,-0.95,-0.93,-0.78,-0.66,-0.77,-1.2,-1.82,-1.75,-1.47,-0.99,-1.28,-1.13,-1.18,-0.98,-0.9,-0.95,-0.88,-0.68,-0.29,0.07,-0.22,-0.48,-0.69],"periods":[10,20,5],"warmup":25,"label":"coin50"},"btc_macd":{"fast":[0.0,-0.45,-0.81,-1.58,-2.3,-2.62,-3.1,-3.65,-4.97,-5.13,-5.29,-5.21,-5.08,-5.02,-5.05,-5.07,-4.75,-4.34,-4.05,-3.76,-3.62,-3.55,-3.38,-3.1,-2.85,-2.64,-2.73,-2.8,-2.43,-2.17,-2.08,-1.88,-1.82,-1.44,-1.19,-0.57,-0.26,-0.3,-0.41,-0.6,-0.5,-0.27,-0.07,0.11,0.28,0.42,0.68,1.05,1.22,1.07,0.81,0.66,0.39,0.08,0.14,0.15,0.22,0.04,-0.33,-0.6,-0.83,-0.9,-0.8,-0.73,-0.78,-0.8,-0.76,-0.56,-0.42,-0.01,0.21,0.44,0.71,0.91,0.82,1.09,1.24,1.4,1.53,1.77,1.8,1.6,1.62,1.66,1.83,1.94,1.9,1.86,1.9,1.77,1.54,1.3,1.15,1.2,1.26,1.27,1.38,1.53,1.67,1.61,1.56,1.53,1.64,1.64,1.5,1.25,1.22,0.98,0.7,0.41,0.15,-0.07,-0.16,-0.21,-0.45,-0.5,-0.5,-0.47,-0.57,-0.77,-0.99,-1.15,-1.21,-1.25,-1.47,-2.06,-2.71,-3.17,-3.72,-4.08,-4.05,-3.97,-3.98,-3.94,-3.63,-3.35,-3.0,-2.57,-2.15,-1.86,-1.72,-1.74,-1.67,-1.52,-1.47,-1.34,-1.35,-1.49,-1.69,-1.78,-1.82,-1.86,-1.8,-1.87,-1.76,-1.5,-1.19,-0.88,-0.59,-0.33,-0.19,-0.19,-0.1,0.06,0.15,0.2,0.1,0.29,0.39,0.37,0.36,0.43,0.47,0.54,0.7,0.77,0.71,0.56,0.47,0.48,0.33,0.23,0.16,0.18,0.01,-0.13,-0.15,-0.17,-0.13,-0.04,-0.01,0.08,0.14,0.18,0.11,0.03,-0.04,-0.1,-0.18,-0.23,-0.28,-0.16,-0.05,0.47,1.21,2.24,2.84,3.3,3.7,3.89,4.01,4.15,3.95,3.77,3.51,3.35,3.07,2.79,2.92,2.8,2.69,2.61,2.38,2.11,1.86,1.48,1.23,1.03,0.83,0.79,0.5,0.33,0.23,0.57,0.85,1.03,1.67,2.07,2.16,2.19,2.15,2.11,2.05,1.88,1.73,1.59,1.57,1.51,1.45,1.55,1.53,1.46,1.18,0.8,0.58,0.45,0.42,0.2,0.17,-0.01,-0.08,-0.19,-0.28,-0.29,-0.3,-0.2,-0.03,-0.15,-0.26,-0.37],"signal":[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,-3.07,-2.96,-2.91,-2.75,-2.55,-2.4,-2.23,-2.09,-1.87,-1.65,-1.29,-0.95,-0.73,-0.62,-0.62,-0.58,-0.47,-0.34,-0.19,-0.04,0.12,0.3,0.55,0.78,0.87,0.85,0.79,0.65,0.46,0.35,0.28,0.26,0.19,0.02,-0.19,-0.4,-0.57,-0.65,-0.67,-0.71,-0.74,-0.75,-0.68,-0.6,-0.4,-0.2,0.01,0.25,0.47,0.58,0.75,0.92,1.08,1.23,1.41,1.54,1.56,1.58,1.61,1.68,1.77,1.81,1.83,1.85,1.82,1.73,1.59,1.44,1.36,1.33,1.31,1.33,1.4,1.49,1.53,1.54,1.54,1.57,1.59,1.56,1.46,1.38,1.25,1.06,0.85,0.61,0.39,0.21,0.07,-0.11,-0.24,-0.32,-0.37,-0.44,-0.55,-0.7,-0.85,-0.97,-1.06,-1.2,-1.48,-1.89,-2.32,-2.78,-3.22,-3.49,-3.65,-3.76,-3.82,-3.76,-3.62,-3.42,-3.13,-2.8,-2.49,-2.23,-2.07,-1.94,-1.8,-1.69,-1.57,-1.5,-1.5,-1.56,-1.63,-1.69,-1.75,-1.77,-1.8,-1.79,-1.69,-1.52,-1.31,-1.07,-0.82,-0.61,-0.47,-0.35,-0.21,-0.09,0.01,0.04,0.12,0.21,0.26,0.3,0.34,0.38,0.44,0.52,0.61,0.64,0.62,0.57,0.54,0.47,0.39,0.31,0.27,0.18,0.08,0.0,-0.06,-0.08,-0.07,-0.05,-0.01,0.04,0.09,0.1,0.07,0.03,-0.01,-0.07,-0.12,-0.18,-0.17,-0.13,0.07,0.45,1.05,1.64,2.2,2.7,3.1,3.4,3.65,3.75,3.76,3.68,3.57,3.4,3.2,3.11,3.0,2.9,2.8,2.66,2.48,2.27,2.01,1.75,1.51,1.28,1.12,0.91,0.72,0.55,0.56,0.66,0.78,1.08,1.41,1.66,1.84,1.94,2.0,2.02,1.97,1.89,1.79,1.72,1.65,1.58,1.57,1.56,1.53,1.41,1.21,1.0,0.81,0.68,0.52,0.4,0.27,0.15,0.04,-0.07,-0.14,-0.2,-0.2,-0.14,-0.14,-0.18,-0.25],"hist":[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,0.43,0.23,0.1,0.32,0.39,0.31,0.34,0.27,0.43,0.46,0.72,0.68,0.43,0.22,0.01,0.08,0.2,0.27,0.3,0.31,0.31,0.37,0.5,0.44,0.19,-0.04,-0.13,-0.27,-0.38,-0.22,-0.14,-0.04,-0.15,-0.35,-0.41,-0.42,-0.33,-0.16,-0.05,-0.07,-0.06,-0.02,0.12,0.18,0.39,0.41,0.42,0.46,0.44,0.23,0.34,0.33,0.32,0.3,0.37,0.26,0.04,0.04,0.05,0.15,0.17,0.09,0.03,0.05,-0.05,-0.19,-0.29,-0.29,-0.16,-0.07,-0.04,0.05,0.14,0.18,0.08,0.02,-0.0,0.07,0.05,-0.06,-0.21,-0.16,-0.26,-0.37,-0.43,-0.47,-0.45,-0.36,-0.28,-0.34,-0.26,-0.18,-0.09,-0.13,-0.22,-0.29,-0.3,-0.24,-0.19,-0.27,-0.57,-0.82,-0.85,-0.94,-0.87,-0.55,-0.32,-0.22,-0.12,0.12,0.27,0.41,0.57,0.66,0.63,0.51,0.33,0.27,0.28,0.22,0.23,0.15,0.01,-0.13,-0.14,-0.12,-0.11,-0.03,-0.07,0.03,0.19,0.34,0.43,0.48,0.5,0.42,0.28,0.25,0.27,0.24,0.2,0.06,0.17,0.18,0.11,0.06,0.09,0.08,0.1,0.18,0.16,0.07,-0.05,-0.1,-0.05,-0.14,-0.16,-0.16,-0.09,-0.17,-0.2,-0.15,-0.11,-0.05,0.03,0.04,0.08,0.1,0.09,0.02,-0.04,-0.08,-0.09,-0.11,-0.11,-0.11,0.01,0.08,0.4,0.76,1.19,1.2,1.11,1.0,0.8,0.61,0.5,0.2,0.01,-0.16,-0.21,-0.33,-0.41,-0.19,-0.2,-0.21,-0.2,-0.28,-0.37,-0.41,-0.53,-0.52,-0.48,-0.46,-0.33,-0.41,-0.38,-0.33,0.01,0.19,0.25,0.59,0.66,0.5,0.36,0.21,0.11,0.03,-0.09,-0.16,-0.2,-0.14,-0.14,-0.13,-0.02,-0.03,-0.06,-0.23,-0.41,-0.42,-0.37,-0.27,-0.32,-0.24,-0.27,-0.23,-0.23,-0.21,-0.15,-0.11,-0.01,0.12,-0.0,-0.08,-0.13],"periods":[10,20,5],"warmup":25},"volume":{"total":[104472125797,156961595857,170679744443,180978003027,140064859446,207243386161,169163101987,165877704079,268871243551,259063111511,148521174714,89356096830,117123248524,98367408889,115219192598,103392850399,96735550297,84112476526,110448343529,85502557076,87687984067,82750968403,77789573608,103595062645,52441277100,49466536619,115501385952,92071655381,126676168987,104282252961,97314040428,102407056705,100208703973,127249408045,113100447429,155254645779,111679151937,96288970822,55500143084,75155532369,108743480149,114831821516,99042740510,95642849028,133610216933,56565868133,71747227317,141022295064,115375647270,111146167690,105176508223,89063741072,51189301598,74978674405,124726403123,95659652803,87676550780,93245872628,100849309238,52390550787,54318895460,88721282139,99801061878,93278546833,97407802977,59592298894,44130005628,56293830934,91804299364,107549855878,102130642916,93725019365,99348099626,72423026353,75889437383,116615554405,156313384405,132540939641,152063229025,175737309975,119941767426,125226986403,143239222439,132812492740,153159227772,145436855836,132755908140,98340939748,105813368651,141380491667,119150659303,138991149955,122132606594,131594709548,90283275544,94293269792,169914137706,145740607837,154228720016,140816374677,96636527651,63141179913,88191883390,91432944989,87671766736,93672631637,105773258619,96509231551,65558649851,57065924331,100202338712,70080826675,75691936284,80066673817,79851239255,80932213662,59930319182,63672949548,95801714922,88507992546,100932002320,89619325334,60420493223,58256214747,111676315856,129507676340,124511765299,145820894026,170408905760,82554271665,84770964184,88094734741,90795386813,74665250033,77601686073,72791448189,49022759173,56656033141,91630885147,75577135511,83055560428,78073735647,58254648796,50142890672,48764942736,70822006487,71650423595,92870296892,94416995377,93702689507,43696001908,45749494035,80947941589,76402113041,85439614252,88271790720,67184055771,53184751693,53896812718,86833948513,73041535226,69234495974,62865550550,66224690316,44051898662,46003128149,72528361523,72046357304,67160107361,64639793411,64247385781,36461979032,40504582572,70380378345,69205127577,64917763827,60629115148,62382523141,38694180680,42181477034,68151135259,62995390532,67535538950,58815631975,65725673049,35297321254,40122576829,56964993957,54971758352,58512263866,50639624570,55848095296,33724458367,37542595812,55520989871,53053826896,54318711673,47258096983,48346789170,29001841174,28559816612,51607778777,47430822982,113399860882,129801347371,173432750419,139133454271,91844702880,129194262293,109192603822,79826385509,95539243520,99806332856,42554441422,59581052931,79674757428,82161630703,73484496262,104292363785,100954299778,59389006759,68704378343,73703407608,88181030953,87035355000,85251113236,109837250807,41733122533,48148108598,84586658291,102372942864,87124516248,72705238958,117503403034,71724184365,71361592725,148632164498,114260697106,125358866589,100865307373,101261756566,51527368258,62910065623,113633625223,91372385068,98905498776,92236188647,118685794420,43220001218,46110507814,84551892907,72369785805,105198813506,120784386779,70444692135,43636254618,48247310685,80678065030,84897992281,84725463802,107498233750,75696697439,42245350139,53670782058,66438750632,74206720701,79878364188,79452737323,64897139031,null],"ema":[106684424192,119253717108,132110223942,144327168713,143261591397,159257040088,161733555563,162769592692,189295005407,206737031933,192183067628,166476324928,154138055827,140195394093,133951343719,126311720389,118917677866,110216377531,110274369030,104081416042,99983058048,95675035637,91203670129,94301518258,83836457969,75243977631,85308329711,86999161129,96918413093,98759373060,98398039902,99400294103,99602396570,106514149439,108160723937,119934204397,117870441282,112475073667,98231341021,92462388858,96532661681,101107451639,100591273857,99354167650,107918179971,95080102011,89246883338,102190736269,105486964019,106901764937,106470450759,102118773337,89386405402,85784472653,95519955271,95554879654,93585297435,93500441233,95337658235,84600881373,77030384895,79953109206,84915097374,87005959738,89606420548,82102890135,72609669008,68530709489,74349106958,82649294188,87519631370,89070978369,91640258683,86835950600,84099322296,92228380323,108249631344,114322458418,123757651070,136752565796,132549866204,130719146253,133849165300,133589997160,138482304813,140220942569,138354683962,128351247908,122716778094,127382706487,125324694691,128741308507,127089133029,128215527159,118732464255,112622665639,126945533656,131644302201,137290406655,138171898660,127788055908,111626336909,105767723529,102184028894,98555963355,97335130425,99444662474,98710804743,90422766020,82083555598,86613251376,82480145201,80783092972,80603988183,80415800951,80544904129,75391257892,72461680806,78296689335,80849515138,85870136933,86807434033,80210698831,74722077810,83960637321,95347397076,102638489132,113434090355,127677794207,116396913571,108490426225,103391503354,100242474219,93848168172,89786547647,85537772783,76409019380,71470772820,76510800902,76277384554,77971928523,77997380304,73061697427,67331995738,62690232488,64723175987,66454987889,73058815140,78398360199,82224442526,72592332372,65881622787,69648202488,71336680126,74862413658,78214757923,75457082385,69888999712,65890952964,71126701851,71605410195,71012681640,68975898867,68288096729,62229047213,58172567447,61761515966,64332726300,65039571565,64939627027,64766566715,57690419795,53393960489,57640564953,60531705609,61628220163,61378443910,61629463717,55895642958,52467101477,56388109923,58039930075,60413832294,60014282214,61442129923,54905927756,51210090024,52648816007,53229551593,54550229662,53572578389,54141457615,49037207803,46163554806,48502913572,49640641903,50810159345,49922143755,49528305109,44396689125,40437470997,43230047942,44280241702,61560146497,78620446715,102323522641,111526005549,106605679882,112252825484,111487770069,103572423929,101564128827,101124679834,86482120231,79756853406,79736329411,80342654734,78628115116,85044177283,89021707907,81613532620,78386244051,77215534940,79956908943,81726520457,82607668652,89415064191,77494578776,70157961232,73765135497,80917087338,82468944566,80028018164,89396864381,84978694377,81574418964,98338855348,102319315787,108079203488,106275729459,105022236236,91648519241,84463905837,91756335683,91660348029,93471635716,93162773949,99543529067,85462647105,75624612282,77856432438,76484770780,83663281461,92943557791,87318841377,76398194687,69360473687,72189871522,75366901712,77706542235,85154465113,82790023195,72653854931,67908086713,67540752693,69207244695,71875024568,73769452757,71551374325,null],"emaPeriod":7,"heightRatio":0.1,"keepDays":300,"empty":false,"haveDays":269,"source":"cache","rows":300,"today":"20261024","intraday":{"index":269,"date":"2026-10-24","value":61786748366,"updated":"2026-10-24T06:30:59.999Z","ageHours":6.0,"note":"滚动 24h（未结算）"}},"vol_tips":["正常","温和放量","温和放量","温和放量","正常","温和放量","轻微放量","轻微放量","明显放量","明显放量","正常","缩量","缩量","缩量","正常","缩量","缩量","缩量","缩量","缩量","缩量","缩量","缩量","缩量","缩量","缩量","正常","缩量","正常","正常","正常","正常","正常","轻微放量","正常","温和放量","正常","正常","缩量","缩量","正常","正常","正常","正常","轻微放量","缩量","缩量","轻微放量","正常","正常","正常","正常","缩量","缩量","轻微放量","正常","正常","正常","正常","缩量","缩量","正常","正常","正常","正常","缩量","缩量","缩量","正常","轻微放量","轻微放量","正常","正常","正常","正常","轻微放量","明显放量","温和放量","温和放量","明显放量","轻微放量","轻微放量","轻微放量","轻微放量","轻微放量","轻微放量","正常","正常","正常","正常","正常","正常","正常","正常","缩量","缩量","轻微放量","正常","正常","正常","缩量","缩量","缩量","缩量","缩量","缩量","正常","正常","缩量","缩量","正常","缩量","缩量","缩量","正常","正常","缩量","缩量","正常","正常","轻微放量","正常","缩量","缩量","轻微放量","温和放量","轻微放量","温和放量","明显放量","正常","正常","正常","正常","缩量","正常","缩量","缩量","缩量","正常","正常","正常","正常","缩量","缩量","缩量","正常","正常","正常","轻微放量","轻微放量","缩量","缩量","正常","正常","轻微放量","轻微放量","正常","缩量","缩量","轻微放量","正常","正常","正常","正常","缩量","缩量","正常","正常","正常","正常","正常","缩量","缩量","正常","正常","正常","正常","正常","缩量","缩量","正常","正常","正常","正常","正常","缩量","缩量","正常","正常","正常","正常","正常","缩量","缩量","正常","正常","正常","正常","正常","缩量","缩量","正常","正常","明显放量","放量异常","放量异常","明显放量","轻微放量","明显放量","温和放量","正常","轻微放量","轻微放量","缩量","缩量","正常","正常","正常","轻微放量","正常","缩量","缩量","缩量","正常","正常","正常","轻微放量","缩量","缩量","正常","轻微放量","正常","正常","温和放量","正常","正常","明显放量","轻微放量","轻微放量","正常","正常","缩量","缩量","轻微放量","正常","正常","正常","轻微放量","缩量","缩量","正常","缩量","正常","轻微放量","缩量","缩量","缩量","正常","正常","正常","轻微放量","正常","缩量","缩量","正常","正常","正常","正常","正常",""],"vol_tip_colors":["#43a047","#f57c00","#f57c00","#f57c00","#43a047","#f57c00","#66bb6a","#66bb6a","#e65100","#e65100","#43a047","#42a5f5","#42a5f5","#42a5f5","#43a047","#42a5f5","#42a5f5","#42a5f5","#42a5f5","#42a5f5","#42a5f5","#42a5f5","#42a5f5","#42a5f5","#42a5f5","#42a5f5","#43a047","#42a5f5","#43a047","#43a047","#43a047","#43a047","#43a047","#66bb6a","#43a047","#f57c00","#43a047","#43a047","#42a5f5","#42a5f5","#43a047","#43a047","#43a047","#43a047","#66bb6a","#42a5f5","#42a5f5","#66bb6a","#43a047","#43a047","#43a047","#43a047","#42a5f5","#42a5f5","#66bb6a","#43a047","#43a047","#43a047","#43a047","#42a5f5","#42a5f5","#43a047","#43a047","#43a047","#43a047","#42a5f5","#42a5f5","#42a5f5","#43a047","#66bb6a","#66bb6a","#43a047","#43a047","#43a047","#43a047","#66bb6a","#e65100","#f57c00","#f57c00","#e65100","#66bb6a","#66bb6a","#66bb6a","#66bb6a","#66bb6a","#66bb6a","#43a047","#43a047","#43a047","#43a047","#43a047","#43a047","#43a047","#43a047","#42a5f5","#42a5f5","#66bb6a","#43a047","#43a047","#43a047","#42a5f5","#42a5f5","#42a5f5","#42a5f5","#42a5f5","#42a5f5","#43a047","#43a047","#42a5f5","#42a5f5","#43a047","#42a5f5","#42a5f5","#42a5f5","#43a047","#43a047","#42a5f5","#42a5f5","#43a047","#43a047","#66bb6a","#43a047","#42a5f5","#42a5f5","#66bb6a","#f57c00","#66bb6a","#f57c00","#e65100","#43a047","#43a047","#43a047","#43a047","#42a5f5","#43a047","#42a5f5","#42a5f5","#42a5f5","#43a047","#43a047","#43a047","#43a047","#42a5f5","#42a5f5","#42a5f5","#43a047","#43a047","#43a047","#66bb6a","#66bb6a","#42a5f5","#42a5f5","#43a047","#43a047","#66bb6a","#66bb6a","#43a047","#42a5f5","#42a5f5","#66bb6a","#43a047","#43a047","#43a047","#43a047","#42a5f5","#42a5f5","#43a047","#43a047","#43a047","#43a047","#43a047","#42a5f5","#42a5f5","#43a047","#43a047","#43a047","#43a047","#43a047","#42a5f5","#42a5f5","#43a047","#43a047","#43a047","#43a047","#43a047","#42a5f5","#42a5f5","#43a047","#43a047","#43a047","#43a047","#43a047","#42a5f5","#42a5f5","#43a047","#43a047","#43a047","#43a047","#43a047","#42a5f5","#42a5f5","#43a047","#43a047","#e65100","#d32f2f","#d32f2f","#e65100","#66bb6a","#e65100","#f57c00","#43a047","#66bb6a","#66bb6a","#42a5f5","#42a5f5","#43a047","#43a047","#43a047","#66bb6a","#43a047","#42a5f5","#42a5f5","#42a5f5","#43a047","#43a047","#43a047","#66bb6a","#42a5f5","#42a5f5","#43a047","#66bb6a","#43a047","#43a047","#f57c00","#43a047","#43a047","#e65100","#66bb6a","#66bb6a","#43a047","#43a047","#42a5f5","#42a5f5","#66bb6a","#43a047","#43a047","#43a047","#66bb6a","#42a5f5","#42a5f5","#43a047","#42a5f5","#43a047","#66bb6a","#42a5f5","#42a5f5","#42a5f5","#43a047","#43a047","#43a047","#66bb6a","#43a047","#42a5f5","#42a5f5","#43a047","#43a047","#43a047","#43a047","#43a047","#888888"],"heat":{"label":"RS_Maps热度","values":[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,67.33,77.16,66.34,69.34,62.53,75.67,76.84,73.78,45.07,41.6,46.67,46.17,38.22,48.0,47.89,59.66,46.89,33.56,32.78,39.11,58.11,61.77,46.89,26.44,24.67,25.67,36.0,24.44,17.67,24.0,41.11,57.0,32.89,34.67,26.44]}};
var FULL = DATA || {};
var PAGE_DAYS = Math.max(1, Number(FULL.pageDays) || 90);
var PAGE_COUNT = Math.max(1, Math.ceil(((FULL.dates || []).length) / PAGE_DAYS));
var pageIndex = PAGE_COUNT - 1;
function sliceDeep(value, from, to, fullLen) {
if (Array.isArray(value)) {
return value.length === fullLen ? value.slice(from, to) : value;
}
if (value && typeof value === 'object') {
var out = {};
for (var key in value) {
if (Object.prototype.hasOwnProperty.call(value, key)) {
out[key] = sliceDeep(value[key], from, to, fullLen);
}
}
return out;
}
return value;
}
function slicePage(page) {
if (!FULL || !FULL.dates || !FULL.dates.length) { return FULL; }
var fullLen = FULL.dates.length;
var to = Math.min(fullLen, fullLen - (PAGE_COUNT - 1 - page) * PAGE_DAYS);
var from = Math.max(0, to - PAGE_DAYS);
var out = sliceDeep(FULL, from, to, fullLen);
if (out.volume && out.volume.intraday) {
var at = Number(out.volume.intraday.index);
var shifted = at - from;
if (isFinite(at) && shifted >= 0 && shifted < (to - from)) {
out.volume = Object.assign({}, out.volume);
out.volume.intraday = Object.assign({}, out.volume.intraday, { index: shifted });
} else {
out.volume = Object.assign({}, out.volume, { intraday: null });
}
}
return out;
}
function updatePager() {
var info = document.getElementById('divergence-page-info');
if (info) { info.textContent = '第 ' + (pageIndex + 1) + '/' + PAGE_COUNT + ' 页'; }
var box = document.getElementById('divergence-pager');
if (!box) { return; }
var buttons = box.getElementsByTagName('button');
for (var i = 0; i < buttons.length; i++) {
var dir = Number(buttons[i].getAttribute('data-dir'));
buttons[i].disabled = dir < 0 ? pageIndex <= 0 : pageIndex >= PAGE_COUNT - 1;
}
}
function renderPage(page) {
pageIndex = Math.min(Math.max(0, page), PAGE_COUNT - 1);
DATA = slicePage(pageIndex);
draw();
updatePager();
}
function wirePager() {
var box = document.getElementById('divergence-pager');
if (!box) { return; }
box.addEventListener('click', function (event) {
var target = event.target;
if (!target || target.tagName !== 'BUTTON') { return; }
var dir = Number(target.getAttribute('data-dir'));
if (!dir) { return; }
renderPage(pageIndex + dir);
});
updatePager();
}
DATA = slicePage(pageIndex);
if (document.readyState === 'complete') {
window.setTimeout(wirePager, 0);
} else {
window.addEventListener('load', wirePager);
}
var COLORS = {
index: 'rgba(206,215,221,0.72)', ma10: 'rgba(90,150,230,0.30)', ma20: 'rgba(214,160,86,0.30)',
ma50: 'rgba(181,140,224,0.30)', top: '#e0605f', bottom: '#3fbf7f', axis: '#89949b',
btc: 'rgba(140,150,158,0.55)',
topLine: 'rgba(206,112,110,0.40)', bottomLine: 'rgba(86,170,124,0.40)', markBorder: '#1b2227'
};
var MA_COLORS = { '10': COLORS.ma10, '20': COLORS.ma20, '50': COLORS.ma50 };
var MACD_COLORS = { fast: '#5a96e6', signal: '#d6a056', up: 'rgba(63,191,127,0.75)', down: 'rgba(224,96,95,0.75)' };
var VOLUME_COLORS = {
up: 'rgba(63,191,127,0.72)', down: 'rgba(224,96,95,0.72)',
flat: 'rgba(137,148,155,0.55)', ema: 'rgba(255,255,255,0.85)'
};
var OVERBOUGHT = 80;
var OVERSOLD = 20;

function describe(point) {
var when = point.days_ago <= 0 ? '今日确认' : (point.days_ago + ' 天前确认');
return '强度 ' + point.strength + ' · ' + point.freshness + '（' + when + '）';
}

function describePre(point, kind) {
var away = kind === 'top' ? -point.gap_pct : point.gap_pct;
var parts = ['强度 ' + point.strength];
if (away > 0.005) {
parts.push('还差 ' + away.toFixed(2) + '% ' + (kind === 'top' ? '创 60 日新高' : '创 60 日新低'));
} else {
parts.push('已' + (kind === 'top' ? '突破' : '跌破') + '极值 ' + Math.abs(point.gap_pct).toFixed(2) + '%');
}
parts.push(point.pre_of ? (point.pre_of + ' 确认') : '待确认');
if (point.provisional) { parts.push('当日未收盘，暂按潜在处理'); }
return parts.join(' · ');
}

function volumeBarColor(index) {
var values = DATA.index || [];
var today = values[index];
var yesterday = index > 0 ? values[index - 1] : null;
if (typeof today !== 'number' || typeof yesterday !== 'number') { return VOLUME_COLORS.flat; }
if (today > yesterday) { return VOLUME_COLORS.up; }
if (today < yesterday) { return VOLUME_COLORS.down; }
return VOLUME_COLORS.flat;
}

function formatVolume(value) {
if (typeof value !== 'number' || !isFinite(value)) { return '-'; }
return (value / 1e9).toFixed(1) + 'B';
}

function draw() {
var LINE_COIN50 = '#7FB3C8';
var node = document.getElementById('divergence-chart');
if (!node) { return; }
if (!window.echarts) {
node.innerHTML = '<div class="chart-fallback">ECharts 未加载（本图需要联网从 CDN 取库），'
+ '图表暂不可用；下方文字结论仍然有效。</div>';
return;
}
var series = [{
name: '市场指数（左轴）', type: 'line', yAxisIndex: 0, data: DATA.index,
smooth: true, showSymbol: false, z: 3,
lineStyle: { width: 2, color: COLORS.index }, itemStyle: { color: COLORS.index }
}];
var mainstreamShown = !!(DATA.mainstream_index
&& DATA.mainstream_index.filter(function (v) { return v !== null; }).length > 1);
if (mainstreamShown) {
series.push({
name: DATA.mainstream_label || 'coin50', type: 'line', yAxisIndex: 0,
data: DATA.mainstream_index, smooth: true, showSymbol: false, connectNulls: false, z: 2,
lineStyle: { width: 1, color: LINE_COIN50 }, itemStyle: { color: LINE_COIN50 }
});
}
var markLineHostIndex = series.length;
var periods = Object.keys(DATA.ma).sort(function (a, b) { return Number(a) - Number(b); });
periods.forEach(function (period) {
var color = MA_COLORS[period] || COLORS.axis;
series.push({
name: 'MA' + period + ' 广度（右轴）', type: 'line', yAxisIndex: 1, data: DATA.ma[period],
smooth: true, showSymbol: false, z: 2,
lineStyle: { width: 1.3, color: color }, itemStyle: { color: color }
});
});
if (series.length > markLineHostIndex) {
series[markLineHostIndex].markLine = {
silent: true, symbol: 'none',
label: { show: false },
data: [
{ yAxis: OVERBOUGHT, lineStyle: { color: COLORS.topLine, type: 'dashed', width: 1 } },
{ yAxis: OVERSOLD, lineStyle: { color: COLORS.bottomLine, type: 'dashed', width: 1 } }
]
};
}
var btcShown = !!(DATA.btc_index && DATA.btc_index.filter(function (v) { return v !== null; }).length > 1);
if (btcShown) {
series.push({
name: 'BTC（参考）', type: 'line', yAxisIndex: 0, data: DATA.btc_index,
smooth: true, showSymbol: false, connectNulls: false, z: 1,
lineStyle: { width: 1, color: COLORS.btc, type: 'dotted' },
itemStyle: { color: COLORS.btc }
});
}
series.push({
name: '顶背离', type: 'scatter', yAxisIndex: 0, data: DATA.top_points, symbolSize: 11, z: 5,
itemStyle: { color: COLORS.top, borderColor: COLORS.markBorder, borderWidth: 1 }
});
series.push({
name: '底背离', type: 'scatter', yAxisIndex: 0, data: DATA.bottom_points, symbolSize: 11, z: 5,
itemStyle: { color: COLORS.bottom, borderColor: COLORS.markBorder, borderWidth: 1 }
});
series.push({
name: '潜在顶背离', type: 'scatter', yAxisIndex: 0, data: DATA.pre_top_points,
symbol: 'emptyCircle', symbolSize: 9, z: 4,
itemStyle: { color: 'rgba(224,96,95,0.75)', borderColor: 'rgba(224,96,95,0.75)', borderWidth: 1.6 }
});
series.push({
name: '潜在底背离', type: 'scatter', yAxisIndex: 0, data: DATA.pre_bottom_points,
symbol: 'emptyCircle', symbolSize: 9, z: 4,
itemStyle: { color: 'rgba(63,191,127,0.75)', borderColor: 'rgba(63,191,127,0.75)', borderWidth: 1.6 }
});
[
['顶背离（coin50）', DATA.mainstream_top_points, 'circle', 11, 5, COLORS.top, COLORS.top, true],
['底背离（coin50）', DATA.mainstream_bottom_points, 'circle', 11, 5, COLORS.bottom, COLORS.bottom, true],
['潜在顶背离（coin50）', DATA.mainstream_pre_top_points, 'emptyCircle', 9, 4, 'rgba(224,96,95,0.75)', 'rgba(224,96,95,0.75)', false],
['潜在底背离（coin50）', DATA.mainstream_pre_bottom_points, 'emptyCircle', 9, 4, 'rgba(63,191,127,0.75)', 'rgba(63,191,127,0.75)', false]
].forEach(function (spec) {
if (!spec[1]) { return; }
series.push({
name: spec[0], type: 'scatter', yAxisIndex: 0, data: spec[1],
symbol: spec[2], symbolSize: spec[3], z: spec[4],
itemStyle: spec[7]
? { color: spec[5], borderColor: COLORS.markBorder, borderWidth: 1 }
: { color: spec[6], borderColor: spec[6], borderWidth: 1.6 }
});
});

var MAIN_TOP = 54, MAIN_HEIGHT = 706, PANEL_HEIGHT = 141, PANEL_STEP = 172, PANEL_LEAD = 32;
var MAIN_AXIS_GAP = 22;
var panels = [];
if (DATA.k_macd && DATA.k_macd.fast && DATA.k_macd.fast.length) {
panels.push({ data: DATA.k_macd, title: 'K-MACD', subtitle: '价格动量' });
}
if (DATA.k50_macd && DATA.k50_macd.fast && DATA.k50_macd.fast.length) {
panels.push({ data: DATA.k50_macd, title: 'K50-MACD',
subtitle: (DATA.k50_macd.label || 'coin50') + ' 价格动量' });
}
if (DATA.btc_macd && DATA.btc_macd.fast && DATA.btc_macd.fast.length) {
panels.push({ data: DATA.btc_macd, title: 'BTC-MACD', subtitle: 'BTC 价格动量' });
}
if (DATA.macd && DATA.macd.fast && DATA.macd.fast.length) {
panels.push({ data: DATA.macd, title: 'B-MACD', subtitle: '短线/中线资金博弈' });
}
var hasVolume = !!DATA.volume;
var VOL_GAP = 6;
var VOL_HEIGHT = hasVolume
? Math.max(40, Math.round(MAIN_HEIGHT * (DATA.volume.heightRatio || 0.1))) : 0;
var VOL_TOP = MAIN_TOP + MAIN_HEIGHT + VOL_GAP;
var mainGroupBottom = hasVolume ? VOL_TOP + VOL_HEIGHT : MAIN_TOP + MAIN_HEIGHT;
var hasHeat = !!(DATA.heat && DATA.heat.values);
var lastPanelBottom = mainGroupBottom + MAIN_AXIS_GAP + PANEL_LEAD
+ (hasHeat ? PANEL_STEP : 0) + (panels.length - 1) * PANEL_STEP + PANEL_HEIGHT;
node.style.height = (panels.length
? lastPanelBottom + 117
: mainGroupBottom + (hasVolume ? MAIN_AXIS_GAP + 20 : 40)) + 'px';

var plots = [{ left: 52, right: 56, top: MAIN_TOP, height: MAIN_HEIGHT }];
var graphics = [];
var xAxes = [{
type: 'category', data: DATA.dates, gridIndex: 0,
axisLabel: { show: !hasVolume, color: COLORS.axis, fontSize: 10 },
axisTick: { show: !hasVolume },
axisLine: { lineStyle: { color: '#38434a' } }
}];
var yAxes = [
{
type: 'value', name: '指数', min: 0,
max: function (value) { return Math.max(100, Math.ceil(value.max / 10) * 10); },
nameTextStyle: { color: COLORS.axis },
axisLabel: { color: COLORS.axis, fontSize: 10 },
splitLine: { show: false }
},
{
type: 'value', name: '广度 %', min: 0, max: 100, interval: 20,
nameTextStyle: { color: COLORS.axis },
axisLabel: { color: COLORS.axis, fontSize: 10, formatter: '{value}%' },
splitLine: { show: true, lineStyle: { color: 'rgba(255,255,255,0.07)' } }
}
];
var VOL_AXIS_INDEX = 1;
if (hasVolume) {
plots.push({ left: 52, right: 56, top: VOL_TOP, height: VOL_HEIGHT });
xAxes.push({
type: 'category', data: DATA.dates, gridIndex: VOL_AXIS_INDEX,
axisLabel: { show: true, color: COLORS.axis, fontSize: 10 },
axisTick: { show: true },
axisLine: { lineStyle: { color: '#38434a' } }
});
yAxes.push({
type: 'value', gridIndex: VOL_AXIS_INDEX, min: 0,
max: function (value) { return value.max > 0 ? Math.ceil(value.max * 1.3) : null; },
axisLabel: {
show: !DATA.volume.empty, color: COLORS.axis, fontSize: 10,
formatter: function (value) { return formatVolume(value); }
},
splitLine: { show: !DATA.volume.empty, lineStyle: { color: 'rgba(255,255,255,0.05)' } },
axisLine: { show: false }
});
if (DATA.volume.empty) {
graphics.push({
type: 'text', left: 'center', top: VOL_TOP + VOL_HEIGHT / 2 - 8,
style: { text: '数据累积中', fill: 'rgba(137,148,155,0.9)', fontSize: 12 }
});
} else {
series.push({
name: '全市场成交额（24h 结算值）', type: 'bar',
xAxisIndex: VOL_AXIS_INDEX, yAxisIndex: VOL_AXIS_INDEX + 1,
data: DATA.volume.total, barWidth: '58%', barGap: '-100%', z: 1,
itemStyle: { color: function (params) { return volumeBarColor(params.dataIndex); } }
});
if (DATA.volume.intraday && DATA.volume.intraday.value) {
var provisional = (DATA.volume.total || []).map(function (_ignored, i) {
return i === DATA.volume.intraday.index ? DATA.volume.intraday.value : null;
});
series.push({
name: '今日滚动 24h（未结算）', type: 'bar',
xAxisIndex: VOL_AXIS_INDEX, yAxisIndex: VOL_AXIS_INDEX + 1,
data: provisional, barWidth: '58%', barGap: '-100%', z: 2,
itemStyle: {
color: 'rgba(137,148,155,0.30)',
borderColor: 'rgba(214,222,227,0.55)', borderWidth: 1
}
});
}
series.push({
name: '成交额 EMA' + (DATA.volume.emaPeriod || 7), type: 'line',
xAxisIndex: VOL_AXIS_INDEX, yAxisIndex: VOL_AXIS_INDEX + 1,
data: DATA.volume.ema, smooth: false, connectNulls: false, z: 3,
showSymbol: DATA.volume.haveDays <= 2, symbol: 'circle', symbolSize: 4,
lineStyle: { width: 1.4, color: VOLUME_COLORS.ema }, itemStyle: { color: VOLUME_COLORS.ema }
});
}
}
var HEAT_LINE = '#f2c14e';      // 与源图那条健康度线**同色**（源图脚本里的 `HEALTH`）
var HEAT_AXIS_INDEX = hasVolume ? 2 : 1;
function heatMarks(from, to) {
var values = (DATA.heat && DATA.heat.values) || [];
var dates = DATA.dates || [];
if (from === undefined) { from = 0; }
if (to === undefined) { to = values.length - 1; }
var best = null, worst = null;
for (var i = from; i <= to; i++) {
var value = values[i];
if (value === null || value === undefined) { continue; }
if (!best || value > best.value) { best = { coord: [dates[i], value], value: value }; }
if (!worst || value < worst.value) { worst = { coord: [dates[i], value], value: value }; }
}
var marks = [];
if (best) { marks.push({ name: '最高', coord: best.coord, value: best.value }); }
if (worst) { marks.push({ name: '最低', coord: worst.coord, value: worst.value }); }
return marks;
}
if (hasHeat) {
var heatTop = mainGroupBottom + MAIN_AXIS_GAP + PANEL_LEAD;
plots.push({ left: 52, right: 56, top: heatTop, height: PANEL_HEIGHT });
xAxes.push({
type: 'category', data: DATA.dates, gridIndex: HEAT_AXIS_INDEX,
axisLabel: { show: false }, axisTick: { show: false },
axisLine: { lineStyle: { color: '#38434a' } }
});
yAxes.push({
type: 'value', gridIndex: HEAT_AXIS_INDEX, min: 0, max: 100,
nameTextStyle: { color: COLORS.axis },
axisLabel: { color: COLORS.axis, fontSize: 10, formatter: '{value}%' },
splitLine: { show: true, lineStyle: { color: 'rgba(255,255,255,0.07)' } }
});
graphics.push({
type: 'text', left: 52, top: heatTop - 20,
style: { text: '{t|RS_Maps热度}', rich: { t: { fill: '#c9d4da', fontSize: 12, fontWeight: 600 } } }
});
series.push({
name: 'RS_Maps热度', type: 'line',
xAxisIndex: HEAT_AXIS_INDEX, yAxisIndex: HEAT_AXIS_INDEX + 1,
symbol: 'circle', symbolSize: 4, z: 5,
lineStyle: { color: HEAT_LINE, width: 1.6 }, itemStyle: { color: HEAT_LINE },
emphasis: { disabled: true },
blur: { itemStyle: { opacity: 1 }, lineStyle: { opacity: 1 }, label: { opacity: 1 } },
connectNulls: false,
data: DATA.heat.values,
markLine: {
silent: true, symbol: 'none', label: { show: false },
lineStyle: { color: 'rgba(242,193,78,0.35)', type: 'dashed', width: 1 },
data: [{ yAxis: 40 }]
},
markPoint: {
symbol: 'pin', symbolSize: 32, data: heatMarks(),
itemStyle: { color: HEAT_LINE, opacity: 0.9 },
label: {
fontSize: 10, color: '#1b2227',
formatter: function (p) { return Number(p.value).toFixed(1); }
}
}
});
}
var legendMain = ['市场指数（左轴）'];
if (mainstreamShown) { legendMain.push(DATA.mainstream_label || 'coin50'); }
periods.forEach(function (period) { legendMain.push('MA' + period + ' 广度（右轴）'); });
if (btcShown) { legendMain.push('BTC（参考）'); }
legendMain = legendMain.concat(['顶背离', '底背离', '潜在顶背离', '潜在底背离']);
var legends = [{ top: 0, itemGap: 10, data: legendMain, textStyle: { color: COLORS.axis, fontSize: 11 } }];
panels.forEach(function (panel, panelIndex) {
var gridIndex = panelIndex + (hasVolume ? 2 : 1) + (hasHeat ? 1 : 0);
var gridTop = mainGroupBottom + MAIN_AXIS_GAP + PANEL_LEAD
+ (hasHeat ? PANEL_STEP : 0) + panelIndex * PANEL_STEP;
var titleTop = gridTop - 20;
plots.push({ left: 52, right: 56, top: gridTop, height: PANEL_HEIGHT });
xAxes.push({
type: 'category', data: DATA.dates, gridIndex: gridIndex,
axisLabel: { show: panelIndex === panels.length - 1, color: COLORS.axis, fontSize: 10 },
axisTick: { show: panelIndex === panels.length - 1 },
axisLine: { lineStyle: { color: '#38434a' } }
});
yAxes.push({
type: 'value', gridIndex: gridIndex,
nameTextStyle: { color: COLORS.axis },
axisLabel: { color: COLORS.axis, fontSize: 10 },
splitLine: { show: true, lineStyle: { color: 'rgba(255,255,255,0.07)' } }
});
legends.push({
top: titleTop - 5, itemGap: 10, textStyle: { color: COLORS.axis, fontSize: 11 },
data: [panel.title + ' 柱', panel.title + ' 快线', panel.title + ' 信号线']
});
graphics.push({
type: 'text', left: 52, top: titleTop,
style: {
text: '{t|' + panel.title + '}{s|' + panel.subtitle + '}',
rich: {
t: { fill: '#c9d4da', fontSize: 12, fontWeight: 600 },
s: { fill: COLORS.axis, fontSize: 11, padding: [1, 0, 0, 8] }
}
}
});
series.push({
name: panel.title + ' 柱', type: 'bar', xAxisIndex: gridIndex, yAxisIndex: gridIndex + 1,
data: panel.data.hist, barWidth: '55%', z: 1,
itemStyle: {
color: function (params) {
return (typeof params.value === 'number' && params.value >= 0)
? MACD_COLORS.up : MACD_COLORS.down;
}
}
});
series.push({
name: panel.title + ' 快线', type: 'line', xAxisIndex: gridIndex, yAxisIndex: gridIndex + 1,
data: panel.data.fast, smooth: false, showSymbol: false, z: 3,
lineStyle: { width: 1.6, color: MACD_COLORS.fast }, itemStyle: { color: MACD_COLORS.fast },
markLine: {
silent: true, symbol: 'none', label: { show: false },
data: [{ yAxis: 0, lineStyle: { color: 'rgba(255,255,255,0.30)', type: 'dashed', width: 1 } }]
}
});
series.push({
name: panel.title + ' 信号线', type: 'line', xAxisIndex: gridIndex, yAxisIndex: gridIndex + 1,
data: panel.data.signal, smooth: false, showSymbol: false, connectNulls: false, z: 3,
lineStyle: { width: 1.6, color: MACD_COLORS.signal },
itemStyle: { color: MACD_COLORS.signal }
});
});
var NOTE_COLUMNS = [52, 310];
var NOTE_ROWS = [
['绿柱放大 → 短线资金强势，行情加速', '绿柱缩短 → 短线优势收缩，减仓/不追高'],
['红柱缩短 → 短线劣势收缩，准备抄底', '红柱放大 → 短线资金撤退，谨慎/观望'],
['快线上穿零轴 → 短线资金开始主导，偏多', '快线下穿零轴 → 短线资金走弱，偏空']
];
if (panels.length) {
var noteTop = lastPanelBottom + 35;
NOTE_ROWS.forEach(function (row, rowIndex) {
row.forEach(function (cell, columnIndex) {
graphics.push({
type: 'text', left: NOTE_COLUMNS[columnIndex], top: noteTop + rowIndex * 24,
style: { text: cell, fill: 'rgba(137,148,155,0.95)', fontSize: 12 }
});
});
});
}

var chart = crsCharts.init(node, null, { renderer: 'canvas' });
chart.setOption({
backgroundColor: 'transparent',
animation: false,
color: [COLORS.index, COLORS.ma10, COLORS.ma20, COLORS.ma50],
legend: legends,
grid: plots,
axisPointer: { link: [{ xAxisIndex: 'all' }] },
graphic: graphics,
tooltip: {
trigger: 'axis',
formatter: function (params) {
var lines = [params[0].axisValue];
params.forEach(function (item) {
if (item.seriesType === 'scatter') {
if (item.data && item.data.value !== null && item.data.value !== undefined) {
if (item.seriesName.indexOf('潜在') === 0) {
var kind = item.seriesName.indexOf('顶') > 0 ? 'top' : 'bottom';
lines.push(item.marker + item.seriesName + '：' + describePre(item.data, kind));
} else {
lines.push(item.marker + item.seriesName + '：' + describe(item.data));
}
}
} else if (item.seriesName.indexOf('滚动 24h') >= 0) {
if (item.value !== null && item.value !== undefined) {
lines.push(item.marker + '全市场成交额（今日滚动 24h，未结算）：' + formatVolume(item.value));
}
} else if (item.value !== null && item.value !== undefined) {
var isMacd = item.seriesName.indexOf('-MACD') >= 0;
var isVolume = item.seriesName.indexOf('成交额') >= 0;
var isHeatLine = item.seriesName === 'RS_Maps热度';
var shown = isVolume ? formatVolume(item.value)
: (isMacd && typeof item.value === 'number' ? item.value.toFixed(2)
: (isHeatLine ? Number(item.value).toFixed(2) : item.value));
var suffix = isVolume ? ''
: (isHeatLine ? '%' : (item.seriesName.indexOf('广度') >= 0 ? '%' : (isMacd ? ' pt' : '')));
if (isVolume && item.seriesName.indexOf('EMA') < 0) {
var volTip = (DATA.vol_tips || [])[item.dataIndex];
var volCol = (DATA.vol_tip_colors || [])[item.dataIndex] || '#888888';
if (volTip) { shown += '（<span style="color:' + volCol + '">' + volTip + '</span>）'; }
}
lines.push(item.marker + item.seriesName + '：' + shown + suffix);
}
});
return lines.join('<br>');
}
},
xAxis: xAxes,
yAxis: yAxes,
series: series
});
if (hasHeat && chart && chart.on) {
chart.on('datazoom', function () {
var zoom = (chart.getOption() || {}).dataZoom || [];
var from, to, n = (DATA.heat.values || []).length;
if (zoom.length) {
var z = zoom[0];
if (z.start !== undefined || z.end !== undefined) {
from = Math.max(0, Math.floor(n * Number(z.start || 0) / 100));
to = Math.min(n - 1, Math.ceil(n * Number(z.end === undefined ? 100 : z.end) / 100) - 1);
} else {
var si = (DATA.dates || []).indexOf(z.startValue);
var ei = (DATA.dates || []).indexOf(z.endValue);
if (si >= 0) { from = si; }
if (ei >= 0) { to = ei; }
}
}
chart.setOption({ series: [{ name: 'RS_Maps热度', markPoint: { data: heatMarks(from, to) } }] });
});
}
function syncSize() {
if (node.clientWidth > 0 && node.clientHeight > 0) { chart.resize(); }
}
crsCharts.onResize(syncSize);
var panel = node.closest('.tab-panel');
if (panel && window.MutationObserver) {
crsCharts.watchPanel(panel, syncSize);
}
}

if (document.readyState === 'complete') { draw(); } else { window.addEventListener('load', draw); }
})();