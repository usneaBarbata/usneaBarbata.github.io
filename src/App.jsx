function App() {
    const [name, setName] = React.useState('');
    const [phone, setPhone] = React.useState('');
    const [searchName, setSearchName] = React.useState('');
    const [message, setMessage] = React.useState('');
    const [searchResult, setSearchResult] = React.useState(null);
  
    const handleAddContact = async (e) => {
      e.preventDefault();
      try {
        const response = await fetch('/api/contacts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, phone }),
        });
        const data = await response.json();
        if (response.ok) {
          setMessage('Contact added successfully!');
          setName('');
          setPhone('');
        } else {
          setMessage(data.error || 'Failed to add contact');
        }
      } catch (error) {
        setMessage('Error adding contact');
      }
      setTimeout(() => setMessage(''), 3000);
    };
  
    const handleSearchContact = async (e) => {
      e.preventDefault();
      try {
        const response = await fetch(`/api/contacts/search?name=${encodeURIComponent(searchName)}`);
        const data = await response.json();
        if (response.ok) {
          setSearchResult(data);
        } else {
          setSearchResult({ error: data.error || 'Contact not found' });
        }
      } catch (error) {
        setSearchResult({ error: 'Error searching contact' });
      }
    };
  
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
        <h1 className="text-3xl font-bold mb-6">Phone Book App</h1>
        
        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Add Contact</h2>
          <form onSubmit={handleAddContact}>
            <div className="mb-4">
              <label className="block text-gray-700">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Phone Number</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
              Add Contact
            </button>
          </form>
          {message && (
            <p className="mt-4 text-center text-green-600">{message}</p>
          )}
        </div>
  
        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Search Contact</h2>
          <form onSubmit={handleSearchContact}>
            <div className="mb-4">
              <label className="block text-gray-700">Name</label>
              <input
                type="text"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
              Search
            </button>
          </form>
          {searchResult && (
            <div className="mt-4">
              {searchResult.error ? (
                <p className="text-red-600">{searchResult.error}</p>
              ) : (
                <p className="text-green-600">
                  {searchResult.name}: {searchResult.phone}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
  
  ReactDOM.render(<App />, document.getElementById('root'));