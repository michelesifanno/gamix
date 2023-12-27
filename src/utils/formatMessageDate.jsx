const formatMessageDate = (createdAt) => {
  const dateTime = new Date(createdAt);
  const day = String(dateTime.getDate()).padStart(2, '0');
  const month = String(dateTime.getMonth() + 1).padStart(2, '0');
  const year = dateTime.getFullYear();

  const formattedDate = `${day}/${month}/${year}`;

  const formattedTime = dateTime.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
  });

  return `${formattedDate} - ${formattedTime}`;
};

export default formatMessageDate;
