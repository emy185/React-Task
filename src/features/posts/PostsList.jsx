import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./style.css";
import { fetchPosts, addPost, updatePost, deletePost } from "./slices/postsSlice";
import { faEdit, faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";
import Button from "../../Components/Buttons/Button";
import UpdatePostModal from "../../Components/Modals/UpdatePostModal";

function PostsList() {
  const [showModal, setShowModal] = useState(false);
  const [currentPost, setCurrentPost] = useState({
    title: "",
    body: "",
  });

  const isEffectRun = useRef(false); // Track if effect has run
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.postsData.posts);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isEffectRun.current) {
      dispatch(fetchPosts());
      isEffectRun.current = true;
    }
  }, [dispatch]);

  const formik = useFormik({
    initialValues: {
      title: "",
      body: "",
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .min(10, "Title must be at least 10 characters")
        .max(100, "Title must not exceed 100 characters")
        .required("Title is required"),
      body: Yup.string()
        .min(50, "Body must be at least 50 characters")
        .max(500, "Body must not exceed 500 characters")
        .required("Body is required"),
    }),
    onSubmit: (values, { resetForm }) => {
      dispatch(addPost(values)).then(() => {
        toast.success("Post added successfully");
        resetForm();
      });
    },
  });

  const handleShowModal = (post) => {
    setCurrentPost(post);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleUpdatePost = () => {
    const updatedPostData = { title: currentPost.title, body: currentPost.body };
    dispatch(updatePost({ id: currentPost.id, updatedData: updatedPostData })).then(() => {
      setShowModal(false);
      toast.success("Post has been updated successfully");
    });
  };

  const handleDeletePost = (postId) => {
    dispatch(deletePost(postId)).then(() => {
      toast.success("Post deleted successfully");
    });
  };

  const handleTitleClick = (post) => {
    navigate(`/posts/${post.id}`, { state: { post } });
  };

  return (
    <>
      <div className="posts-container">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              {posts &&
                posts.map((post) => (
                  <div className="card post-item" key={post.id}>
                    <div className="card-body">
                      <h5 onClick={() => handleTitleClick(post)}>
                        {post.id} - {post.title}
                      </h5>
                      <p className="card-text">{post.body}</p>
                      <div className="postControlButtons">
                        <Button
                          color="primary"
                          icon={faEdit}
                          text="Update"
                          onClick={() => handleShowModal(post)}
                        />
                        <Button
                          color="danger"
                          icon={faTrash}
                          text="Delete"
                          onClick={() => handleDeletePost(post.id)}
                        />
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            <div className="col-lg-4">
              <form onSubmit={formik.handleSubmit} className="add-post-form">
                <input
                  type="text"
                  className={`form-control mb-2 ${
                    formik.touched.title && formik.errors.title ? "is-invalid" : ""
                  }`}
                  placeholder="Title"
                  {...formik.getFieldProps("title")}
                />
                {formik.touched.title && formik.errors.title ? (
                  <div className="invalid-feedback">{formik.errors.title}</div>
                ) : null}

                <textarea
                  className={`form-control mb-2 ${
                    formik.touched.body && formik.errors.body ? "is-invalid" : ""
                  }`}
                  placeholder="Body"
                  rows="4"
                  {...formik.getFieldProps("body")}
                />
                {formik.touched.body && formik.errors.body ? (
                  <div className="invalid-feedback">{formik.errors.body}</div>
                ) : null}

                <Button
                  color="success"
                  icon={faPlus}
                  text="Add Post"
                  type="submit"
                />
              </form>
            </div>
          </div>
        </div>
      </div>

      <UpdatePostModal
        showModal={showModal}
        handleCloseModal={handleCloseModal}
        currentPost={currentPost}
        handleChangeData={setCurrentPost}
        handleUpdatePost={handleUpdatePost}
      />
      <ToastContainer />
    </>
  );
}

export default PostsList;