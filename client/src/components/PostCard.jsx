import { Link } from 'react-router-dom';

const PostCard = ({ post }) => {
    return (
        <div className='border rounded-lg overflow-hidden shadow-lg hover:shadow-xl 
        transition-shadow'>
            {post.featuredImage && (
                <img 
                    src={`/uploads/${post.featuredImage}`}
                    alt={post.title}
                    className='w-full h-48 object-cover'
                />
            )}

            <div className='p-4'>
                <h3 className='text-xl font-bold mb-2'>
                    <Link to={`/posts/${post._id}`} className='hover:text-blue-600'>
                        {post.title}
                    </Link>
                </h3>
                <p className='text-zinc-600 mb-2'>
                    {post.content.substring(0, 100)}... 
                </p>
                <div className='flex justify-between items-center'>
                    <span className='text-sm text-zinc-500'>
                        {new Date(post.createAt).toLocaleDateString()}
                    </span>
                    {post.category && (
                        <span className='px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs'>
                            {post.category.name}
                        </span>
                    )}
                </div>
            </div>
        </div>
    )
}

export default PostCard;