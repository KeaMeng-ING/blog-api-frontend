export default function FeaturedPost({ post }) {
  return (
    <div className="grid md:grid-cols-2 gap-6 bg-gray-100 dark:bg-black rounded-lg overflow-hidden">
      <div className="h-[400px] bg-gray-200 dark:bg-gray-800">
        <img
          src={post.imageUrl || "/placeholder.svg"}
          alt={post.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-8 flex flex-col justify-center">
        <div className="flex items-center space-x-2 mb-4">
          <span className="bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-sm font-medium">
            {post.category}
          </span>
          <span className="text-gray-500 dark:text-gray-400 text-sm">•</span>
          <span className="text-gray-500 dark:text-gray-400 text-sm">
            {post.readTime}
          </span>
        </div>

        <h2 className="text-3xl font-bold mb-3">{post.title}</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">{post.subtitle}</p>
        <p className="mb-6">{post.excerpt}</p>

        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-700 mr-3"></div>
          <div>
            <div className="font-medium">{post.author}</div>
            <div className="text-gray-500 dark:text-gray-400 text-sm">
              {post.date}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
