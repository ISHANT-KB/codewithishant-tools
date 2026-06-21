import { Blog } from '../types';
import { Link } from '../lib/router';
import { BookOpen, User, Calendar, Clock } from 'lucide-react';

interface BlogCardProps {
  blog: Blog;
  key?: any;
}

export default function BlogCard({ blog }: BlogCardProps) {
  return (
    <article
      className="group bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-slate-100 dark:hover:shadow-none hover:border-slate-350 dark:hover:border-slate-700 transition-all duration-300 flex flex-col justify-between"
      id={`blog-card-${blog.slug}`}
    >
      <Link href={`/blog/${blog.slug}`} className="block overflow-hidden" id={`blog-card-link-${blog.slug}`}>
        {/* Editorial Visual block instead of placeholder images to satisfy performance */}
        <div className="h-44 bg-gradient-to-br from-slate-50 to-emerald-50/30 dark:from-slate-900 dark:to-emerald-950/10 p-6 flex flex-col justify-between border-b border-slate-100 dark:border-slate-800/80 relative">
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] dark:opacity-[0.05]" />
          <span className="self-start text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/15 relative z-10">
            {blog.category}
          </span>
          <div className="relative z-10">
            <h4 className="text-xl font-serif font-semibold text-slate-800 dark:text-slate-100 group-hover:text-emerald-500 transition-colors line-clamp-2 leading-snug">
              {blog.title}
            </h4>
          </div>
        </div>
      </Link>

      <div className="p-6 flex-1 flex flex-col justify-between">
        <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed mb-6">
          {blog.description}
        </p>

        <div className="space-y-3.5 pt-4 border-t border-slate-100 dark:border-slate-800/85 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 font-medium text-slate-700 dark:text-slate-350">
              <User className="w-3.5 h-3.5 text-slate-400" />
              {blog.author}
            </span>
          </div>
          
          <div className="flex items-center justify-between text-[11px]">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-slate-455" />
              {blog.date}
            </span>
            <span className="flex items-center gap-1 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-350 px-2 py-0.5 rounded">
              <Clock className="w-3 h-3 text-slate-455" />
              {blog.readTime}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
