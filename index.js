const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());




function alternatingCapsReverse(alphabets) {
  let str = alphabets.join("");
  str = str.split("").reverse().join(""); 
  let result = "";
  for (let i = 0; i < str.length; i++) {
    result += i % 2 === 0 ? str[i].toUpperCase() : str[i].toLowerCase();
  }
  return result;
}

app.post("/bfhl", (req, res) => {
  try {
    const { data } = req.body;
    if (!data || !Array.isArray(data)) {
      return res.status(400).json({ is_success: false, error: "Invalid input" });
    }

    let even_numbers = [];
    let odd_numbers = [];
    let alphabets = [];
    let special_characters = [];
    let sum = 0;

    data.forEach((item) => {
      if (!isNaN(item) && item.trim() !== "") {
        let num = parseInt(item);
        sum += num;
        if (num % 2 === 0) even_numbers.push(item);
        else odd_numbers.push(item);
      } else if (/^[a-zA-Z]+$/.test(item)) {
        alphabets.push(item.toUpperCase());
      } else {
        special_characters.push(item);
      }
    });

    const response = {
      is_success: true,
      user_id: "p_srinivasa_praneeth_01022005", 
      email: "srinivasapraneeth2022@vitbhopal.ac.in",
      roll_number: "22BCE11214",
      odd_numbers,
      even_numbers,
      alphabets,
      special_characters,
      sum: sum.toString(),
      concat_string: alternatingCapsReverse(alphabets),
    };

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ is_success: false, error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

