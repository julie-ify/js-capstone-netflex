// IEprda6bVbN0jOFjgzgK

const postLikes = async (item) => {
  const response = await fetch('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/IEprda6bVbN0jOFjgzgK/likes', {
    method: 'POST',
    body: JSON.stringify({ item_id: item }),
    headers: {
      'Content-type': 'application/json; Charset=UTF-8',
    },
  })

  return response.text()
}

export default postLikes