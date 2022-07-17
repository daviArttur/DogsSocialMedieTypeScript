import React from 'react';

// Styles
import styles from './PhotoComment.module.scss';

// Component
import PhotoCommentAuthorization from './PhotoCommentAuthorization';

const PhotoComment = ({ data }) => {
  const [commentReload, setCommentReload] = React.useState(() => data.comments);

  return (
    <>
      <ul className={styles.ul}>
        {commentReload.map((options) => {
          return (
            <li key={options.comment_ID} className={styles.comment}>
              <p>
                {' '}
                <a href="qwe">{options.comment_author}: </a>
                {options.comment_content}
              </p>
            </li>
          );
        })}
      </ul>

      <PhotoCommentAuthorization
        data={data}
        setCommentReload={setCommentReload}
      />
    </>
  );
};

export default PhotoComment;
