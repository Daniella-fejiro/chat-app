export const sendMessage = async (receiver, message) => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/chat/send`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`
    },
    body: JSON.stringify({ receiver, message })
  });

  return res.json();
}

;export const getMessages = async (userId) => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/chat/${userId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  });

  return res.json();
};