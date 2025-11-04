# Skill Sessions – Event Management App

Skill Sessions is a responsive event management platform built with React, Chakra UI, and React Router. It helps users discover, create, edit, and manage local events tailored to their interests. This project was developed as a final showcase of my React training, combining everything from component architecture to form handling and routing.

---

##  Features

- **Events List Page**
  - Displays all events with title, description, image, start/end time, and category names
  - Search bar to find events by title
  - Filter system using category checkboxes
  - Skeleton loading UI while fetching data

- **Event Detail Page**
  - Full event details with image, time, and categories
  - Edit modal with form validation and toast feedback
  - Delete button with confirmation dialog and redirect

- **Add Event Modal**
  - Form to create new events with required fields
  - Image URL, time range, and multiple category selection
  - Connected to JSON server backend

- **About Us Page**
  - Personal branding section with quote, contact info, and developer background
  - Routed via React Router

---

##  Tech Stack

- **Frontend**: React, Vite, Chakra UI
- **Routing**: React Router
- **Forms**: React Hook Form
- **State Management**: React Context API
- **Backend**: JSON Server (`events.json`)

---

## Installation

1. Clone the repository  
   `git clone https://github.com/Gudo1971/Event-Manager.git`

2. Install dependencies  
   `npm install`

3. Start JSON server  
   `json-server events.json`

4. Start the app  
   `npm run dev`

---

## Requirements Met

- [x] Context API for global state
- [x] React Router with 3 pages
- [x] Design system (Chakra UI)
- [x] Responsive design
- [x] Required fields in all forms
- [x] Toast notifications on success/failure
- [x] Skeletons while loading
- [x] Search and filter functionality
- [x] Add/Edit/Delete events with backend sync
- [x] Confirmation dialog before deletion
- [x] About Us page with branding and contact

---

##  Developer

**Gudo Gieles**  
Full Stack Developer in training  
📞 +31 6 49038246  
📧 g.gieles@telfort.nl  
🔗 [Connect on LinkedIn](https://www.linkedin.com/in/gudo-gieles-b956395b/)

---

##  License

This project is for educational purposes and personal portfolio use.
