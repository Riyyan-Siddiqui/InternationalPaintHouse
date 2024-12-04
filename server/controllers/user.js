import { db } from "../database/db.js";
import bcrypt from "bcrypt";
import validator from "validator";

// Get all users
export const get_users = (req, res) => {
  db.query("SELECT * FROM Users", (err, results) => {
    if (err) {
      console.error("Database error:", err.message);
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(results);
  });
};

// Get a specific user by ID
export const get_user = (req, res) => {
  const userId = req.params.id;

  console.log("User ID:", userId);
  const query = `
    SELECT user_id, first_name, last_name, email, phone_number1, phone_number2, date_created, last_login
    FROM Users
    WHERE user_id = ? 
  `;

  db.execute(query, [userId], (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Database error" });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "User not found or deleted" });
    }

    res.json(results[0]);
  });
};

// Create a new user (Signup)
export const create_user = (req, res) => {
  const {
    first_name,
    last_name,
    email,
    password,
    phone_number1,
    phone_number2,
    street_address,
    city,
    province,
    country,
    gmaplink,
  } = req.body;

  const isValidPhoneNumber = (number) => {
    return /^[0-9]{4}-?[0-9]{7}$/.test(number);
  };

  if (
    !first_name ||
    !last_name ||
    !email ||
    !password ||
    !street_address ||
    !city ||
    !province ||
    !country
  ) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  if (!validator.isEmail(email)) {
    return res.status(400).json({
      success: false,
      message: "Not a valid Email format",
    });
  }

  if (phone_number1 && !isValidPhoneNumber(phone_number1)) {
    return res.status(400).json({
      success: false,
      message:
        "Phone number 1 is invalid. It must be an 11-digit number with optional dashes.",
    });
  }

  if (phone_number2 && !isValidPhoneNumber(phone_number2)) {
    return res.status(400).json({
      success: false,
      message:
        "Phone number 2 is invalid. It must be an 11-digit number with optional dashes.",
    });
  }

  const validProvinces = [
    "Sindh",
    "Balochistan",
    "Punjab",
    "Khyber Pakhtunkhwa",
    "Kashmir",
  ];
  if (!validProvinces.includes(province)) {
    return res.status(400).json({
      success: false,
      message: `Invalid province. Valid options are: ${validProvinces.join(
        ", "
      )}`,
    });
  }

  bcrypt.hash(password, 10, (err, passwordHash) => {
    if (err) {
      console.error("Error hashing password:", err);
      return res.status(500).json({ error: "Error hashing password" });
    }

    const query = `
      INSERT IGNORE INTO Users (first_name, last_name, email, password_hash, phone_number1, phone_number2, street_address, city, province, country, gmaplink)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.execute(
      query,
      [
        first_name,
        last_name || null,
        email,
        passwordHash || null,
        phone_number1 || null,
        phone_number2 || null,
        street_address || null,
        city || null,
        province || null,
        country || null,
        gmaplink || null,
      ],
      (err, results) => {
        if (err) {
          console.error("Database error:", err);
          return res.status(500).json({ error: "Database error" });
        }

        if (results.affectedRows === 0) {
          return res.status(400).json({ message: "Email already exists" });
        }

        res.status(201).json({
          message: "User created successfully",
          user_id: results.insertId,
        });
      }
    );
  });
};

// Update user details
export const update_user = (req, res) => {
  const userId = req.params.id;
  const {
    first_name,
    last_name,
    email,
    password,
    phone_number1,
    phone_number2,
    street_address,
    city,
    province,
    country,
  } = req.body;

  if (
    !first_name &&
    !last_name &&
    !email &&
    !password &&
    !phone_number1 &&
    !phone_number2 &&
    !street_address &&
    !city &&
    !province &&
    !country
  ) {
    return res.status(400).json({ message: "No fields provided to update" });
  }

  const fields = [];
  const values = [];

  const isValidPhoneNumber = (number) => {
    return /^[0-9]{4}-?[0-9]{7}$/.test(number);
  };

  if (first_name) {
    fields.push("first_name = ?");
    values.push(first_name);
  }
  if (last_name) {
    fields.push("last_name = ?");
    values.push(last_name);
  }
  if (email) {
    fields.push("email = ?");
    values.push(email);
  }
  if (password) {
    try {
      const passwordHash = bcrypt.hashSync(password, 10);
      fields.push("password_hash = ?");
      values.push(passwordHash);
    } catch (error) {
      console.error("Error hashing password:", error);
      return res.status(500).json({ error: "Error hashing password" });
    }
  }
  if (phone_number1) {
    if (!isValidPhoneNumber(phone_number1)) {
      return res.status(400).json({
        success: false,
        message: "Phone number 1 is invalid",
      });
    } else {
      fields.push("phone_number1 = ?");
      values.push(phone_number1);
    }
  }
  if (phone_number2) {
    if (!isValidPhoneNumber(phone_number2)) {
      return res.status(400).json({
        success: false,
        message: "Phone number 2 is invalid",
      });
    } else {
      fields.push("phone_number2 = ?");
      values.push(phone_number2);
    }
  }
  if (street_address) {
    fields.push("street_address = ?");
    values.push(street_address);
  }
  if (city) {
    fields.push("city = ?");
    values.push(city);
  }
  if (province) {
    fields.push("province = ?");
    values.push(province);
  }
  if (country) {
    fields.push("country = ?");
    values.push(country);
  }

  const query = `
    UPDATE Users
    SET ${fields.join(", ")}
    WHERE user_id = ?
  `;
  values.push(userId);

  db.query(query, values, (err, results) => {
    if (err) {
      if (err.code === "ER_DUP_ENTRY") {
        return res.status(400).json({ message: "Email already exists" });
      }
      console.error("Database error:", err.message);
      return res.status(500).json({ error: "Database error" });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "User not found or deleted" });
    }

    res.status(200).json({ message: "User updated successfully" });
  });
};

// Delete user by ID
export const delete_user = (req, res) => {
  const userId = parseInt(req.params.id, 10);
  if (isNaN(userId)) {
    return res.status(400).json({
      success: false,
      message: "User_id is not a valid number",
    });
  }

  const query = `
    DELETE FROM Users
    WHERE user_id = ?
  `;

  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Database error" });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "User not found or deleted" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  });
};

// Login
export const login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email and password are required",
    });
  }

  const query = `SELECT user_id, password_hash FROM Users WHERE email = ?`;

  db.query(query, [email], (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Database error" });
    }

    if (results.length === 0) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const user = results[0];

    bcrypt.compare(password, user.password_hash, (err, isMatch) => {
      if (err) {
        console.error("Bcrypt error:", err);
        return res.status(500).json({ error: "Bcrypt error" });
      }

      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      res.json({ user_id: user.user_id, message: "Login successful" });
    });
  });
};
