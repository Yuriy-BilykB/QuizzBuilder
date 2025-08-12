'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <section className="hero-section flex flex-col justify-center items-center text-center px-4 py-14">
        <div className="fade-in">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="gradient-text">Create</span>
            <br />
            <span className="gradient-text-secondary">Amazing</span>
            <br />
            <span className="gradient-text-accent">Quizzes</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-300 mb-6 max-w-2xl mx-auto">
            Build interactive quizzes with multiple question types. Share with friends,
            track results, and make learning fun and engaging.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <Link href="/create" className="btn btn-secondary text-base px-6 py-3">
              Start Creating
            </Link>
            <Link href="/quizzes" className="btn btn-outline text-base px-6 py-3">
              Browse Quizzes
            </Link>
          </div>
        </div>
      </section>

      <section className="py-14 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-3">
              Why Choose Quiz Builder?
            </h2>
            <p className="text-lg text-gray-300 max-w-xl mx-auto">
              Everything you need to create engaging and interactive quizzes
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="card hover-lift bounce-in">
              <div className="w-14 h-14 gradient-bg-primary rounded-2xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 gradient-text">Easy Creation</h3>
              <p className="text-gray-300 text-sm">
                Create quizzes in minutes with our intuitive interface. Add questions,
                multiple choice answers, and customize everything to your needs.
              </p>
            </div>

            <div className="card hover-lift bounce-in" style={{ animationDelay: '0.2s' }}>
              <div className="w-14 h-14 gradient-bg-secondary rounded-2xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 gradient-text-secondary">Fast & Responsive</h3>
              <p className="text-gray-300 text-sm">
                Built with modern technologies for lightning-fast performance.
                Works seamlessly on all devices and screen sizes.
              </p>
            </div>

            <div className="card hover-lift bounce-in" style={{ animationDelay: '0.4s' }}>
              <div className="w-14 h-14 gradient-bg-accent rounded-2xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 gradient-text-accent">Analytics & Insights</h3>
              <p className="text-gray-300 text-sm">
                Get detailed analytics on quiz performance. Track scores,
                completion rates, and identify areas for improvement.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="flex justify-center items-center py-16 px-4 bg-gradient-to-br from-purple-900 via-indigo-900 to-gray-900">
        <div className="card max-w-3xl mx-auto text-center p-8 shadow-2xl fade-in-up">
          <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
            Ready to Create Your First Quiz?
          </h2>
          <p className="text-lg text-gray-300 mb-6">
            Join thousands of users who are already creating amazing quizzes
          </p>
          <Link
            href="/create"
            className="btn btn-secondary text-base px-6 py-3 pulse transform hover:scale-105 transition-transform duration-300"
          >
            Get Started Now
          </Link>
        </div>
      </section>
    </div>
  );
}
