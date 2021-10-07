/* eslint-disable no-unused-expressions */

import { getCommentCount } from './counters.js';
import { getComments } from './getInvolvement.js';
import { postComments } from './postInvolvement.js';
import renderComments from './renderComments.js';

const modalStructure = async (buttons, showsList) => {
  for (let i = 0; i < buttons.length; i += 1) {
    buttons[i].addEventListener('click', async () => {
      const modalSection = document.createElement('section');
      modalSection.classList.add('container');
      modalSection.style.display = 'flex';
      const modalWrapper = document.createElement('div');
      modalWrapper.classList.add('modal-wrapper');
      const modalDiv = document.createElement('div');
      modalDiv.classList.add('wrapper');

      const close = document.createElement('div');
      close.classList.add('close');
      close.textContent = 'X';
      close.addEventListener('click', () => {
        modalSection.style.display = 'none';
      });
      const imgWrapper = document.createElement('div');
      imgWrapper.classList.add('img-wrapper');
      const img = document.createElement('img');
      img.setAttribute('src', showsList[i].image.medium);
      const itemNumber = document.createElement('h2');
      itemNumber.classList.add('number');
      itemNumber.textContent = `${showsList[i].name}`;
      const detailWrap = document.createElement('div');
      detailWrap.classList.add('detail-wrap');
      const detail1 = document.createElement('h4');
      detail1.textContent = `Language: ${showsList[i].language}`;

      const detail2 = document.createElement('h4');
      detail2.textContent = 'Movie genres: ';
      const { genres } = showsList[i];
      genres.forEach((genre) => {
        detail2.textContent += `${genre}, `;
      });
      const detail3 = document.createElement('h4');
      detail3.innerHTML = `Estimated time: ${showsList[i].runtime}`;

      const detail4 = document.createElement('h4');
      detail4.textContent = `Rating: ${showsList[i].rating.average}`;

      const detail5 = document.createElement('h4');
      detail5.innerHTML = `Summary: ${showsList[i].summary}`;
      detail5.classList.add('summary');

      const detail6 = document.createElement('h4');
      detail6.innerHTML = `<a href="${showsList[i].url}" target="_blank">Watch here</a>`;
      detail6.style.marginTop = '1rem';
      detail6.style.marginBottom = '1rem';
      detail6.classList.add('summary');

      const commentSection = document.createElement('h3');
      commentSection.classList.add('number');
      const addComment = document.createElement('h3');
      addComment.textContent = 'Add a comment';
      addComment.style.marginBottom = '1rem';
      addComment.style.textAlign = 'center';
      const commentForm = document.createElement('form');
      commentForm.classList.add('form');
      const userName = document.createElement('input');
      userName.classList.add('user-name');
      userName.placeholder = 'Your name';
      const userMsg = document.createElement('textarea');
      userMsg.classList.add('user-msg');
      userMsg.placeholder = 'Your insights';
      const commentButton = document.createElement('button');
      commentButton.classList.add('comment-btn');
      commentButton.textContent = 'Comment';
      commentButton.id = `movie_cmt_${showsList[i].id}`;

      const commentDiv = document.createElement('div');
      commentDiv.classList.add('list-item');

      const comments = await getComments(commentButton.id);

      renderComments(commentDiv, comments);
      comments.length >= 1
        ? (commentSection.textContent = `Comments (${comments.length})`)
        : (commentSection.textContent = 'Comments (0)');

      commentButton.addEventListener('click', async (e) => {
        if (userName.value === '' || userMsg.value === '') {
          e.preventDefault();
          const errorMsg = document.createElement('p');
          errorMsg.classList.add('error-msg');
          errorMsg.innerText = 'Please add your name and comment';
          commentButton.parentNode.insertBefore(errorMsg, commentButton);
          setTimeout(() => {
            commentForm.removeChild(errorMsg);
          }, 2000);
        } else {
          e.preventDefault();
          await postComments(commentButton.id, userName, userMsg);
          const getCmts = await getComments(commentButton.id);
          getCommentCount(commentSection, getCmts);
          renderComments(commentDiv, getCmts);
          userName.value = '';
          userMsg.value = '';
        }
      });
      document.body.appendChild(modalSection);
      modalSection.appendChild(modalWrapper);
      modalWrapper.appendChild(modalDiv);
      modalDiv.append(
        close, imgWrapper, itemNumber,
        detailWrap, detail5, detail6, commentSection,
        commentDiv, addComment, commentForm,
      );
      detailWrap.append(detail1, detail2, detail3, detail4);
      imgWrapper.appendChild(img);

      commentForm.append(userName, userMsg, commentButton);
    });
  }
};

export default modalStructure;