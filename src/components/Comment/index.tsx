import axios from "axios";
import React, { useEffect, useState } from "react"
import {
    BrowserRouter as Router,
    useParams
} from "react-router-dom";
import { Command, QueryAPI } from "../../access";
import { CommentModel } from "../../model/comment";
import { defaultUser, UserModel } from "../../model/user";
import moment from "moment";
import './style.scss';
import { notificationError, notificationSuccess } from "../Noti";
import { Empty, Pagination, PaginationProps } from "antd";

export const Comment = () => {
    const user: any = localStorage.getItem('user');
    const userInfo: UserModel = JSON.parse(user);
    const { product_id } = useParams<any>();

    const [refresh, setfresh] = useState(0);
    const [current, setCurrent] = useState(1);

    const [checkComment, setCheckComment] = useState(false);
    const [commentList, setCommentList] = useState<CommentModel[]>([])

    useEffect(() => {
        axios.get(QueryAPI.comment.all(product_id))
            .then(resComment => {
                console.log(resComment);
                setCommentList(resComment.data.ratings)
            })
            .catch(err => {
                alert(err);
                console.log(err)
            })
    }, [refresh])

    useEffect(() => {
        axios.get(QueryAPI.comment.checkComment(userInfo.id, product_id))
            .then(resComment => {
                if (resComment.data.check) {
                    setCheckComment(true)
                } else {
                    setCheckComment(false)
                }
            })
            .catch(err => {
                alert(err);
                console.log(err)
            })
    }, [product_id, userInfo.id])

    const onChange: PaginationProps['onChange'] = (page) => {
        setCurrent(page);
    };

    return <div className="comment-wrapper">
        <h3>Comment</h3>
        <div className="comment-list">
            {commentList.length > 0 ? commentList.slice((current - 1) * 5, current * 5).map(comment => {
                return <EntityComment data={comment} key={comment.id} />
            }) : <>No Comment</>}
        </div>
        {commentList.length > 5 && <Pagination current={current} onChange={onChange} pageSize={5} total={commentList.length} />}
        <WriteCommentComponent disable={checkComment} onSuccess={() => {
            setfresh(prev => prev + 1)
            setCheckComment(true)
        }} />
    </div>
}

const EntityComment = React.memo(({ data }: { data: CommentModel }) => {
    const [user, setUser] = useState<UserModel>();
    useEffect(() => {
        axios.get(QueryAPI.user.single(data.userId))
            .then(res => {
                setUser(res.data)
            })
            .catch(err => {
                alert(err)
            })
    }, [data.userId])

    return <div className="comment-item">
        <div className="image">
            <img src={user?.avatar} alt="no-image" />
        </div>
        <div className="information">
            <div className="user-name">{user?.name}</div>
            <div className="rating">
                <RenderStarComponent numberStar={Number(data.rating) / 2} />
            </div>
            <div className="date-time">{moment(data.created_at).format('MMMM do YYYY h:mm:ss a')}</div>
            <div className="content">{data.content}</div>
        </div>
    </div>
})

const WriteCommentComponent = ({
    onSuccess,
    disable
}: {
    onSuccess: () => void,
    disable: boolean
}) => {
    const [rating, setRating] = useState<number>(0);
    const [content, setContent] = useState<string>('');
    const user: any = localStorage.getItem('user');
    const userInfo: UserModel = JSON.parse(user);
    const { product_id } = useParams<any>();
    const handleSubmitComment = () => {

        axios({
            method: 'post',
            url: Command.comment.add(),
            headers: {},
            data: {
                userId: userInfo.id,
                productId: product_id,
                content: content,
                rating: rating,
            }
        })
            .then((response) => {
                if (response.statusText === 'OK') {
                    notificationSuccess({ description: 'Bạn đã thêm comment thành công' });
                    setRating(0);
                    setContent('');
                    onSuccess();
                }
            }, (error) => {
                alert(error)
            });
    }

    return <div className="write-comment">
        <h4>Write Comment</h4>
        {disable
            ? <div>Bạn đã comment sản phẩm này</div>
            : userInfo ? <>
                <StarRating rating={rating} handleRating={(value) => setRating(value)} />
                <ListRecommendComment handleContent={(value) => setContent(value)} />
                <div className="input-wrapper">
                    <input placeholder="Entern comment for this product..."
                        disabled={disable}
                        value={content}
                        onChange={(e) => {
                            setContent(e.target.value)
                        }}
                    />
                    <button disabled={!rating || !content} style={(!rating || !content) ? { backgroundColor: 'gray', cursor: 'not-allowed' } : {}} onClick={handleSubmitComment}>Comment</button>
                </div>
            </>
                : <a href="/login">Đăng nhập để comment</a>}
    </div>
}

const StarRating = ({
    rating,
    handleRating
}: {
    rating: number;
    handleRating: (value: number) => void;
}) => {
    const [hover, setHover] = useState(0);
    return (
        <div className="star-rating">
            <span>Select Rating:</span>
            {[...Array(5)].map((star, index) => {
                index += 1;
                return (
                    <button
                        type="button"
                        key={index}
                        className={index <= (hover || rating) ? "on" : "off"}
                        onClick={() => handleRating(index)}
                        onMouseEnter={() => setHover(index)}
                        onMouseLeave={() => setHover(rating)}
                    >
                        <i className="fa-solid fa-star"></i>
                    </button>
                );
            })}
        </div>
    );
};

const ListRecommendComment = ({
    handleContent
}: {
    handleContent: (value: string) => void
}) => {
    const suggestList = ['good', 'goood1', 'goood2']
    return <div className="suggest-list">
        {suggestList.map((suggest, index) => {
            console.log("index,suggest", index, suggest)
            return <div
                className="suggest"
                key={index}
                onClick={() => handleContent(suggest)}
            >
                {suggest}
            </div>
        })}
    </div>
}

const RenderStarComponent = ({ numberStar }: { numberStar: number }) => {
    const renderStart = () => {
        if (numberStar <= 1) {
            return <i className="fa-solid fa-star"></i>
        } else if (numberStar <= 2) {
            return <>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
            </>
        } else if (numberStar <= 3) {
            return <>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
            </>
        } else if (numberStar <= 4) {
            return <>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
            </>
        } else {
            return <>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
            </>
        }
    }

    return <div className="render-start">
        {renderStart()}
    </div>
}