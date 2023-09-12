import React, { } from 'react';
import { Link } from 'react-router-dom';
const PostRenderComponent = (postDetail) => {

    switch (postDetail.descriptionType) {

        case 'TEXT':
            return (
                <Link to={`/r/${postDetail.subRedditDto.subredditName}/comments/${postDetail.id}`} className="post-link-description">
                    <p className="detail-post-content-text">{postDetail.description}</p>
                </Link>
            );
        case 'VIDEO':
            return (
                <Link to={`/r/${postDetail.subRedditDto.subredditName}/comments/${postDetail.id}`} className="post-link-description">
                    <div className="video-container">
                        <iframe
                            src={postDetail.description}
                            title="Video player"
                            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                            className="post-content-video"
                        ></iframe>
                    </div>
                </Link>
            );
        case 'LINK':
            return (
                <Link
                    to={postDetail.description}
                    className="detail-post-content-link"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {postDetail.description}
                </Link>

            );
        case 'IMAGE':
            return (
                <Link to={`/r/${postDetail.subRedditDto.subredditName}/comments/${postDetail.id}`} className="post-link-description">
                    <div>
                        <img
                            src={postDetail.description}
                            alt={postDetail.title}
                            className="detail-post-content-image"
                        />
                    </div>
                </Link>
            );
        default:
            return null;
    }


};

export default PostRenderComponent;