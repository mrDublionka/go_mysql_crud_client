import React, {ChangeEvent, useRef, useState} from 'react'
import styles from "@/styles/posts.module.scss";
import {AiOutlinePlus} from "react-icons/ai";
import {useDispatch, useSelector} from "react-redux";
import {showAddPost} from "@/store/common/actions";
import {useForm} from "react-hook-form";
import {addPost, addPostService} from "@/services/posts";

interface Props {
    postFormActive:boolean
}

const AddPostForm:React.FC<Props> = ({postFormActive}) => {
    const dispatch = useDispatch()
    const show = useSelector((state:any) => state.common.show_add_post_form)

    const user = useSelector((state:any) => state.account.user)
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<any>({
        err: false,
        message: "",
    });

    const formRef = useRef(null)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();


    const addPost = async (formData:any, e:any) => {
        let form = new FormData(e.target)

        form.set("userID", user.ID)
        console.log(form.values())
        // const data = await addPostService(form)



    }

    return (
        <>
            <button
                onClick={() => {
                    dispatch(showAddPost(!show))

                }}
                className={styles.posts__addButton}
            >
                <AiOutlinePlus />
            </button>

            {show && (
                <div className={styles.posts__addContainer}>
                    <form
                        onSubmit={handleSubmit(addPost)}
                        action="add post"
                    >
                        <label htmlFor="title">Title</label>
                        <input
                            type="text"
                            name="title"
                        />

                        <label htmlFor="title">Topic</label>

                        <select
                            onChange={(e: ChangeEvent<HTMLSelectElement>) => {}}
                            // ref={selectRef}
                            // defaultValue={topicsForCreation()[0].value}
                            name="topic"
                        >
                            {/*{topicsForCreation()?.map((x, i) => {*/}
                            {/*    return (*/}
                            {/*        <option key={"topic" + x.id} value={x.label}>*/}
                            {/*            {x.value}*/}
                            {/*        </option>*/}
                            {/*    );*/}
                            {/*})}*/}

                            <option value=""></option>
                        </select>

                        <label htmlFor="photo">Photo</label>
                        <input
                            onChange={(e) => {}}
                            type="file"
                            name="image"
                            accept="image/*"
                        />

                        <label htmlFor="content">Photo</label>
                        <textarea
                            onChange={(e) => {}}
                            name="content"
                            style={{ resize: "none" }}
                        ></textarea>

                        <button
                            style={{ color: `${loading ? "gray" : "black"}` }}
                            disabled={loading}
                            type="submit"
                        >
                            {loading ? "laoding..." : "Add post"}
                        </button>
                    </form>

                    {error.message !== "" && (
                        <span
                            style={{ color: `${error.err ? "red" : "green"}` }}
                        >
                          {error.message}
                        </span>
                    )}
                </div>
            )}
    </>

    )
}

export default AddPostForm