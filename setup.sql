-- Create the database
CREATE DATABASE IF NOT EXISTS refer_and_earn;

-- Use the database
USE refer_and_earn;

-- Create table for storing referrals
CREATE TABLE IF NOT EXISTS Referral (
    id INT AUTO_INCREMENT PRIMARY KEY,
    referrerName VARCHAR(255) NOT NULL,
    referrerEmail VARCHAR(255) NOT NULL,
    refereeName VARCHAR(255) NOT NULL,
    refereeEmail VARCHAR(255) NOT NULL,
    course VARCHAR(255) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Display table structure
DESCRIBE Referral;
