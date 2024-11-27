# SmartBites

https://github.com/user-attachments/assets/500c96d7-6740-4f3d-ad30-fd4888bd320a


https://github.com/user-attachments/assets/9775ded2-fed0-4251-93ec-958da59d46ae



## Inspiration
The idea for SmartBites stems from a need to combine convenience and technology to promote mindful eating habits. With increasing reliance on digital tools, we wanted to build an app that not only simplifies meal tracking but also rewards users for smart choices. Inspired by the popularity of gamification in apps, we sought to create a system that combines receipt scanning, instant rewards, and user-friendly meal management to encourage healthier lifestyles.

## What It Does
SmartBites is an innovative platform that:
- **Scans receipts**: Users can scan receipts from grocery or restaurant purchases.
- **Rewards users**: Based on purchase data, users earn points that can be redeemed for discounts or other incentives.
- **Tracks spending**: Provides insights into meal expenses, helping users make informed financial decisions.
- **Promotes smart eating habits**: Encourages users to make healthier choices by rewarding them for nutritious food purchases.

## How We Built It

### Frontend:
- Developed using **React Native** for a cross-platform mobile experience.
- Used **Expo's ImagePicker and Camera API** for receipt scanning and barcode reading.
- Integrated a seamless UI with real-time feedback mechanisms for user interactions.

### Backend:
- Built with **FastAPI** to handle receipt processing and point calculations.
- Integrated **Python scripts** to validate and analyze receipt data using third-party APIs.
- Database management using **PostgreSQL** to store user data, receipt histories, and reward points.

### Technologies Used:
- **Python** for backend logic and API integrations.
- **JavaScript/TypeScript** for frontend development.
- **Supabase** for robust data handling.

## Challenges We Ran Into
1. **Receipt Parsing**:
   - Processing receipt images from various formats and ensuring accurate data extraction was a technical challenge.
   
2. **Camera Integration**:
   - Ensuring smooth camera operations across different devices required testing and debugging.

3. **API Errors**:
   - Handling inconsistencies in third-party APIs during receipt processing caused delays in implementation.

