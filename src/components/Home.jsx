import BlogGrid from "./BlogGrid";
import FeaturedPost from "./FeaturedPost";

export default function Home(props) {
  return (
    <>
      <div className="min-h-screen bg-white dark:bg-[#111827] text-gray-900 dark:text-gray-100 transition-colors duration-200">
        <div className="container max-w-screen-xl mx-auto">
          {props.loading && (
            <div className="text-gray-500">Loading posts...</div>
          )}

          {props.error && (
            <div className="bg-red-100 p-3 text-red-700 rounded mb-4">
              {props.error}
            </div>
          )}

          {!props.loading && !props.error && (
            <>
              <section className="py-16 text-center">
                <div className="container mx-auto px-4">
                  <h1 className="text-5xl font-bold mb-4">The Blog</h1>
                  <p className="text-xl text-gray-600 dark:text-gray-400">
                    Thoughts, stories and ideas from our team
                  </p>
                </div>
              </section>
              {props.allPosts.length === 0 ? (
                <div className="bg-yellow-100 p-3 text-yellow-700 rounded">
                  No posts found
                </div>
              ) : (
                <>
                  <section className="mb-16">
                    <div className="container mx-auto px-4">
                      <FeaturedPost post={props.featuredPost} />
                    </div>
                  </section>

                  <section className="pb-16">
                    <div className="container mx-auto px-4">
                      {/* The BlogGrid will only render when datas has items */}
                      <BlogGrid posts={props.allPosts} />
                    </div>
                  </section>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
