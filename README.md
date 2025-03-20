# Skintuition

## Overview

**Skintuition** is an AI-powered skincare ingredient analyzer that helps users quickly identify harmful and beneficial ingredients in their skincare products by uploading an image of an ingredient list or pasting text.

## Problem Space

Skincare consumers often struggle to understand the ingredients in their products, leading to the use of potentially harmful substances that may cause long-term damage. **Skintuition** simplifies this process using AI and a user-friendly interface, making skincare transparency accessible to everyone.

## User Profile
### Primary Users:
- Skincare enthusiasts
- Dermatology patients
- Clean beauty advocates
- Individuals with sensitive skin

### Considerations:
- The app must be intuitive and mobile-friendly.
- It should provide easy-to-understand ingredient analysis without overwhelming users with technical content.

## Features

- **As a user,** I want to be able to scan an ingredient list via image upload or text input.
- **As a user,** I want AI to categorize ingredients as Beneficial, Potential Irritants, or Harmful.
- **As a user,** I want to receive personalized ingredient analysis based on my skin type.
- **As a user,** I want access to an ingredient glossary to learn about skincare ingredients.
- **As a user,** I want to save products and ingredients for future reference.
- **As a user,** I want an intuitive and user-friendly interface.

### Tech Stack

- **Frontend:** React.js, SCSS for styling
- **Backend:** MySQL (using Workbench for database management)
- **AI:** Gemini API (for text extraction from images)

### APIs

- **Gemini AI** – OCR for ingredient text extraction

### Mockups


### Sitemap

- **Home Page** – App introduction, CTA to scan/paste ingredients
- **Scan Page** – Upload image or paste ingredient list
- **Results Page** – Ingredient breakdown, safety categorization, and recommendations
- **Glossary Page** – Search & browse ingredient information
- **Profile Page** – User settings, saved products, and skin type preferences

### Data Structure

- **Users Table** – Stores user profiles, skin types
- **Ingredients Table** – List of ingredients, their category (**safe, irritant, harmful**), and suitable for: (**dry, normal, oily, combination, sensitive**)

### API Endpoints

#### Authentication
  - **POST** `/api/auth/register` – Registers a new user. Requires email, password, and name.
  - **POST** `/api/auth/login` – Authenticates a user and returns a JWT token.
#### User Profile
  - **GET** `/api/users/profile` – Retrieves the authenticated user’s profile. (Requires JWT token)
  - **POST** `/api/users/update-skin-type` – Updates a user's skin type in their profile. (Requires JWT token)
#### Skin Type
  - **GET** `/api/skin-type/questions` – Retrieves the skin type questionnaire.
  - **POST** `/api/skin-type/` – Determines the user’s skin type based on answers.
#### Image Analysis
  - **POST** `/api/analyze/` – Uploads an image for skin analysis. (Requires a file upload with field "image")


## Roadmap

| Day | Task |
|-----|------|
| 1 | Set up backend (MySQL), initialize the database schema. |
| 2 | Implement AI-Powered Ingredient Breakdown – Integrate Google Cloud Vision API. |
| 3 | Implement NLP categorization for ingredient analysis and match extracted ingredients to database records. |
| 4 | Develop database structure and populate ingredient database (harmful, beneficial, and neutral ingredients). |
| 5 | Build frontend (React) and design the main UI components. |
| 6 | Implement API endpoints to support ingredient breakdown and integrate backend with frontend. |
| 7 | Develop Personalized Skin Type Analysis – User quiz and preference storage. |
| 8 | Implement Better Product Alternatives Finder – Fetch alternative product suggestions based on ingredient analysis. |
| 9 | Develop Smart Ingredient Glossary – Create search & learn functionality for ingredient definitions. |
| 10 | Final UI/UX polish, bug fixes, full app testing, and deployment. |

---

## Future Implementations

- **E-commerce Integration** – Direct links to buy recommended products from Sephora, Amazon, or Ulta.
- **User Reviews & Community Ratings** – Allow users to rate and review ingredients based on personal experiences.
- **AI-Powered Skincare Recommendations** – Suggest entire routines based on skin type and ingredient compatibility.
- **Ingredient Safety Alerts** – Notify users when an ingredient is flagged by dermatology experts.

## Repos
- **https://github.com/hudanadeem/skintuition**
- **https://github.com/hudanadeem/skintuition-backend**

