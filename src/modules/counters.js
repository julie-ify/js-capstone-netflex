const getLikesCount = (target, likesArray, likesContainer) => {
  for (let i = 0; i <= likesArray.length - 1; i++) {
    if (likesArray[i]['item_id'] == target.id) {
      likesContainer.innerHTML = `${likesArray[i].likes} likes`;
    }
  }
};

const showsCount = (showsList) => {
  return showsList.length;
};

const getCommentCount = (section, lists) => {
  section.textContent = '';
  lists.length >= 1
    ? (section.textContent = `Comments (${lists.length})`)
    : (section.textContent = `Comments (0)`);
};

export {getLikesCount, showsCount, getCommentCount};
