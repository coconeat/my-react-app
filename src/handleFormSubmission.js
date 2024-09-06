export const handleSubmit = async (event, name, email, phone) => {
    event.preventDefault();
    const data = { name, email, phone };
  
    try {
      const response = await fetch('https://1ogkyb5fz8.execute-api.us-east-2.amazonaws.com/myreactapp/items', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      if (response.ok) {
        // Handle successful response
        alert('Data successfully submitted!');
      } else {
        // Handle errors
        alert('Failed to submit data.');
      }
    } catch (error) {
      // Handle network errors
      console.error('Error:', error);
      alert('An error occurred.');
    }
  };
