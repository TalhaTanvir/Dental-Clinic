import { useState } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';

const Testimonials = () => {
  const [filter, setFilter] = useState('all');

  const testimonials = [
    {
      id: 1,
      name: 'Jennifer Thompson',
      role: 'Patient for 5 years',
      content: "Dr. Mitchell is absolutely wonderful! I used to dread going to the dentist, but she made me feel so comfortable from my very first visit. Her gentle approach and clear explanations put all my fears at ease. My whole family now sees her!",
      rating: 5,
      service: 'general',
      date: 'October 2025',
      initials: 'JT',
    },
    {
      id: 2,
      name: 'Michael Rodriguez',
      role: 'Patient for 3 years',
      content: "I had my teeth whitened here and the results exceeded my expectations. Dr. Mitchell took the time to understand exactly what I wanted and delivered amazing results. The office is modern, clean, and the staff is incredibly friendly.",
      rating: 5,
      service: 'cosmetic',
      date: 'September 2025',
      initials: 'MR',
    },
    {
      id: 3,
      name: 'Sarah Chen',
      role: 'Patient for 2 years',
      content: "Finding a dentist who is great with kids is so important, and Dr. Mitchell is fantastic! My daughter actually looks forward to her dental appointments now. She makes the experience fun and educational for the little ones.",
      rating: 5,
      service: 'pediatric',
      date: 'November 2025',
      initials: 'SC',
    },
    {
      id: 4,
      name: 'David Williams',
      role: 'Patient for 7 years',
      content: "After years of neglecting my dental health, I was embarrassed to see a dentist. Dr. Mitchell was non-judgmental and created a manageable treatment plan. Now I have a smile I'm proud of. Forever grateful!",
      rating: 5,
      service: 'restorative',
      date: 'August 2025',
      initials: 'DW',
    },
    {
      id: 5,
      name: 'Emily Parker',
      role: 'Patient for 1 year',
      content: "The emergency care here is exceptional. I chipped my front tooth on a Saturday and Dr. Mitchell saw me the same day. She fixed it perfectly and you can't even tell it was ever broken. Highly recommend!",
      rating: 5,
      service: 'emergency',
      date: 'December 2025',
      initials: 'EP',
    },
    {
      id: 6,
      name: 'Robert Johnson',
      role: 'Patient for 4 years',
      content: "I got dental implants to replace two missing teeth and the results are incredible. They look and feel completely natural. Dr. Mitchell's expertise and attention to detail are unmatched. Worth every penny!",
      rating: 5,
      service: 'implants',
      date: 'July 2025',
      initials: 'RJ',
    },
    {
      id: 7,
      name: 'Lisa Martinez',
      role: 'Patient for 2 years',
      content: "The Invisalign treatment was so much easier than I expected. Dr. Mitchell guided me through every step, and now my smile is perfectly straight. I wish I had done this years ago!",
      rating: 5,
      service: 'orthodontics',
      date: 'June 2025',
      initials: 'LM',
    },
    {
      id: 8,
      name: 'James Anderson',
      role: 'Patient for 6 years',
      content: "I've been coming here for years for regular cleanings and checkups. The hygienist Lisa is wonderful, and Dr. Mitchell always takes time to explain everything. Truly a five-star experience every time.",
      rating: 5,
      service: 'general',
      date: 'October 2025',
      initials: 'JA',
    },
    {
      id: 9,
      name: 'Amanda Foster',
      role: 'Patient for 3 years',
      content: "My veneers turned out beautiful! I was nervous about such a big change, but Dr. Mitchell showed me digital previews of what to expect. The result is natural-looking and absolutely stunning.",
      rating: 5,
      service: 'cosmetic',
      date: 'September 2025',
      initials: 'AF',
    },
    {
      id: 10,
      name: 'Christopher Lee',
      role: 'Patient for 1 year',
      content: "As someone with severe dental anxiety, I can't say enough good things about this practice. They offer sedation options and the entire team is so patient and understanding. Finally found my dental home!",
      rating: 5,
      service: 'general',
      date: 'November 2025',
      initials: 'CL',
    },
    {
      id: 11,
      name: 'Patricia Brown',
      role: 'Patient for 8 years',
      content: "Dr. Mitchell did a full smile makeover for me - whitening, some bonding, and a crown. The transformation is incredible. I smile so much more now. Thank you for giving me back my confidence!",
      rating: 5,
      service: 'cosmetic',
      date: 'May 2025',
      initials: 'PB',
    },
    {
      id: 12,
      name: 'Kevin White',
      role: 'Patient for 4 years',
      content: "Brought my three kids here and they all love it! The kids corner keeps them entertained, and the team makes dental care fun. Dr. Mitchell has a real gift with children.",
      rating: 5,
      service: 'pediatric',
      date: 'August 2025',
      initials: 'KW',
    },
  ];

  const filters = [
    { id: 'all', name: 'All Reviews' },
    { id: 'general', name: 'General Care' },
    { id: 'cosmetic', name: 'Cosmetic' },
    { id: 'pediatric', name: 'Pediatric' },
    { id: 'restorative', name: 'Restorative' },
    { id: 'implants', name: 'Implants' },
    { id: 'orthodontics', name: 'Orthodontics' },
    { id: 'emergency', name: 'Emergency' },
  ];

  const filteredTestimonials = filter === 'all'
    ? testimonials
    : testimonials.filter(t => t.service === filter);

  const stats = [
    { value: '500+', label: '5-Star Reviews' },
    { value: '98%', label: 'Would Recommend' },
    { value: '4.9', label: 'Average Rating' },
    { value: '5,000+', label: 'Happy Patients' },
  ];

  return (
    <>
      <PageHeader
        title="Patient Testimonials"
        subtitle="See what our patients have to say about their experiences at our practice."
        breadcrumbs={[{ name: 'Testimonials' }]}
      />

      {/* Stats */}
      <section className="py-12 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-4xl font-bold text-primary-600">{stat.value}</p>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="py-8 bg-gray-50 sticky top-[72px] z-40 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-3">
            {filters.map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  filter === f.id
                    ? 'bg-primary-500 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border'
                }`}
              >
                {f.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-20 lg:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTestimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
              >
                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-accent-400"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>

                {/* Content */}
                <p className="text-gray-700 mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-4 pt-4 border-t">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                    <span className="text-primary-600 font-bold">{testimonial.initials}</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                  <p className="text-xs text-gray-400">{testimonial.date}</p>
                </div>
              </div>
            ))}
          </div>

          {filteredTestimonials.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No reviews found for this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Review Platforms */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Find Us on Review Platforms
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We're proud of our reputation across multiple platforms. Check out our reviews and leave your own!
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Google */}
            <div className="bg-gray-50 rounded-2xl p-8 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 mx-auto bg-white rounded-full flex items-center justify-center shadow-md mb-4">
                <svg className="w-8 h-8" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Google Reviews</h3>
              <div className="flex justify-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-accent-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 mb-4">4.9 out of 5 (300+ reviews)</p>
              <a href="#" className="text-primary-600 font-semibold hover:text-primary-700">
                View on Google →
              </a>
            </div>

            {/* Yelp */}
            <div className="bg-gray-50 rounded-2xl p-8 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 mx-auto bg-white rounded-full flex items-center justify-center shadow-md mb-4">
                <svg className="w-8 h-8 text-red-500" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.16 12.594l-4.995 1.433c-.96.276-1.74-.8-1.176-1.63l2.986-4.375c.522-.765 1.806-.492 1.932.41l.463 3.312c.096.687-.466 1.266-1.21.85zm-8.25 5.89l-1.138-5.126c-.213-.96.845-1.68 1.598-1.087l3.983 3.14c.697.548.39 1.63-.462 1.63h-3.122c-.682 0-1.245-.523-1.245-1.172v.615zm-3.26-7.93l5.012-1.59c.96-.304 1.392 1.058.652 2.052l-3.916 5.264c-.685.92-2.18.19-1.79-.874l1.302-4.022c.182-.562.42-.806.74-.83zm-4.49.644l3.483-3.93c.667-.752 1.94-.287 1.924.703l-.085 5.23c-.013.915-1.283 1.268-1.808.502L4.42 11.23c-.54-.787-.107-1.806.74-2.032zm4.976-6.98l1.296 4.987c.248.953-.846 1.64-1.574 1.012L4.94 6.72c-.672-.58-.312-1.668.542-1.63l3.26.142c.69.03 1.258.573 1.384 1.256v-.013z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Yelp</h3>
              <div className="flex justify-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-accent-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 mb-4">5.0 out of 5 (150+ reviews)</p>
              <a href="#" className="text-primary-600 font-semibold hover:text-primary-700">
                View on Yelp →
              </a>
            </div>

            {/* Healthgrades */}
            <div className="bg-gray-50 rounded-2xl p-8 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 mx-auto bg-white rounded-full flex items-center justify-center shadow-md mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Healthgrades</h3>
              <div className="flex justify-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-accent-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 mb-4">5.0 out of 5 (50+ reviews)</p>
              <a href="#" className="text-primary-600 font-semibold hover:text-primary-700">
                View on Healthgrades →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-28 bg-gradient-to-r from-primary-500 to-primary-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Join Our Family of Happy Patients?
          </h2>
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            Experience the care that has earned us hundreds of 5-star reviews.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-white text-primary-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all hover:shadow-xl"
          >
            Book Your Appointment
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>
    </>
  );
};

export default Testimonials;
