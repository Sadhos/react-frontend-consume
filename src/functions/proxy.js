const axios = require('axios');

exports.handler = async (event) => {
  try {
    const url = 'http://finalshop-api-env.eba-cnpqwnyj.ap-south-1.elasticbeanstalk.com/api/ShoppingCart/null/GetItems';
    const response = await axios.get(url);
    
    return {
      statusCode: 200,
      body: JSON.stringify(response.data)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify(error.message)
    };
  }
};
