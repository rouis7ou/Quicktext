In this practical test, I started by initializing both projects, NestJS for the backend and Next.js for the frontend. I added Docker files for both projects to facilitate containerization. My initial focus was on extracting data from a JSON file. I developed the backend API to retrieve all rooms with pagination and to fetch individual rooms by their ID. After that, I implemented backend tests for the RoomsController and RoomsService, achieving 75% test coverage.   

For the frontend, I began by fetching and displaying all rooms, adding basic CSS and a grid layout to create a user-friendly design. Later, I updated the home page to display only available rooms with minimal information. As I mentioned earlier, I have limited experience with frontend development, so I utilized ChatGPT, Gemini, and the Next.js documentation to guide my work.

This was my first time working with data extracted from a JSON file rather than a database, so I may not have followed the best practices for developing a NestJS application. However, I gave my best effort throughout the project.

In my research on monorepos, I discovered a lot of information that I want to deep into. Topics of interest include tools like 'Turborepo' and comparisons between monorepos and multi-repo setups.

test coverage : 
![image](https://github.com/user-attachments/assets/538c15b6-1607-4b7b-86dc-b1839f05d16b)

http://localhost:4000/rooms?page=1&limit=2 : 
![image](https://github.com/user-attachments/assets/bd4b10f1-b483-4b9b-8380-2725184cad42)
     
http://localhost:4000/rooms/2 :
![image](https://github.com/user-attachments/assets/fe7c863c-2dc6-41c5-9479-b5cb8d875ecc)

http://localhost:3000 :
![image](https://github.com/user-attachments/assets/36bbcfc0-3ae6-4932-a7cf-52d74726d661)

http://localhost:3000/rooms :
![image](https://github.com/user-attachments/assets/29f0b3b1-3a2a-4a2e-9e31-fcd58aa82224)

