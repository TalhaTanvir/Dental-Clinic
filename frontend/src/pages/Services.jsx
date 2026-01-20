import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';

const Services = () => {
  const services = [
    {
      id: 'general',
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: 'General & Preventive Dentistry',
      description: 'Maintain your oral health with comprehensive preventive care designed to keep your smile healthy for life.',
      features: [
        'Comprehensive Dental Exams',
        'Professional Teeth Cleanings',
        'Digital X-rays & Diagnostics',
        'Fluoride Treatments',
        'Dental Sealants',
        'Oral Cancer Screenings',
        'Gum Disease Treatment',
        'Night Guards & Mouth Guards',
      ],
      details: 'Regular dental checkups are the foundation of good oral health. Our preventive care program includes thorough examinations, professional cleanings, and early detection of potential problems. We use the latest digital technology for precise diagnostics and comfortable treatments.',
    },
    {
      id: 'cosmetic',
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      ),
      title: 'Cosmetic Dentistry',
      description: 'Transform your smile with our advanced cosmetic treatments tailored to your aesthetic goals.',
      features: [
        'Professional Teeth Whitening',
        'Porcelain Veneers',
        'Dental Bonding',
        'Smile Makeovers',
        'Gum Contouring',
        'Tooth Reshaping',
        'Cosmetic Crowns',
        'Full Mouth Reconstruction',
      ],
      details: 'Your smile is one of the first things people notice. Our cosmetic dentistry services can help you achieve the beautiful, confident smile you\'ve always wanted. From subtle enhancements to complete smile makeovers, we offer personalized solutions for every patient.',
    },
    {
      id: 'whitening',
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      title: 'Teeth Whitening',
      description: 'Brighten your smile with professional whitening treatments that deliver dramatic, lasting results.',
      features: [
        'In-Office Zoom Whitening',
        'Custom Take-Home Trays',
        'Touch-Up Treatments',
        'Sensitivity-Free Options',
        'Long-Lasting Results',
        'Safe & Effective',
        'Personalized Treatment Plans',
        'Post-Whitening Care',
      ],
      details: 'Professional teeth whitening can dramatically improve your smile in just one visit. Our in-office Zoom whitening can brighten your teeth up to 8 shades in about an hour. We also offer custom take-home kits for gradual whitening on your schedule.',
    },
    {
      id: 'restorative',
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      title: 'Restorative Dentistry',
      description: 'Repair and restore damaged teeth with durable, natural-looking solutions that blend seamlessly with your smile.',
      features: [
        'Tooth-Colored Fillings',
        'Dental Crowns',
        'Dental Bridges',
        'Root Canal Therapy',
        'Dentures & Partials',
        'Inlays & Onlays',
        'Full Mouth Rehabilitation',
        'Same-Day Crowns',
      ],
      details: 'Whether you have a small cavity or need extensive restoration, we offer solutions that look and function like natural teeth. Our tooth-colored materials and advanced techniques ensure beautiful, long-lasting results.',
    },
    {
      id: 'implants',
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      title: 'Dental Implants',
      description: 'Replace missing teeth with the gold standard in tooth replacement - dental implants that look, feel, and function like natural teeth.',
      features: [
        'Single Tooth Implants',
        'Implant-Supported Bridges',
        'Implant-Supported Dentures',
        'All-on-4 Full Arch',
        'Bone Grafting',
        '3D Treatment Planning',
        'Mini Implants',
        'Immediate Load Implants',
      ],
      details: 'Dental implants are the most advanced solution for replacing missing teeth. They provide a permanent, stable foundation for replacement teeth and help preserve your jawbone. Our precise 3D planning ensures optimal placement and beautiful results.',
    },
    {
      id: 'orthodontics',
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
      title: 'Orthodontics',
      description: 'Straighten your teeth and perfect your bite with modern orthodontic solutions for patients of all ages.',
      features: [
        'Invisalign Clear Aligners',
        'Traditional Braces',
        'Clear Ceramic Braces',
        'Retainers',
        'Bite Correction',
        'Early Orthodontic Treatment',
        'Adult Orthodontics',
        'Accelerated Treatment Options',
      ],
      details: 'A straight smile is a healthy smile. Misaligned teeth can lead to problems with chewing, speech, and oral hygiene. We offer various orthodontic options, including nearly invisible Invisalign aligners, to help you achieve a perfectly aligned smile.',
    },
    {
      id: 'pediatric',
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'Pediatric Dentistry',
      description: 'Gentle, kid-friendly dental care that makes visits fun and establishes healthy habits for a lifetime of beautiful smiles.',
      features: [
        'Child-Friendly Exams',
        'Gentle Cleanings',
        'Fluoride Treatments',
        'Dental Sealants',
        'Early Orthodontic Evaluation',
        'Cavity Prevention',
        'Sports Mouth Guards',
        'Education & Fun!',
      ],
      details: 'We love treating kids! Our warm, friendly approach helps children feel comfortable and even excited about dental visits. We focus on prevention and education, teaching kids how to care for their teeth while making every visit a positive experience.',
    },
    {
      id: 'emergency',
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: 'Emergency Dental Care',
      description: 'When dental emergencies happen, we\'re here for you with same-day appointments and compassionate care.',
      features: [
        'Same-Day Appointments',
        'Toothache Relief',
        'Broken Tooth Repair',
        'Lost Filling/Crown',
        'Dental Trauma',
        'Abscess Treatment',
        'Emergency Extractions',
        'After-Hours Care Available',
      ],
      details: 'Dental emergencies can happen at any time. Whether you\'re dealing with severe pain, a broken tooth, or trauma, we prioritize emergency patients and work to see you the same day. Call us immediately for urgent dental needs.',
    },
  ];

  return (
    <>
      <PageHeader
        title="Our Services"
        subtitle="Comprehensive dental care for your entire family, from routine checkups to advanced treatments."
        breadcrumbs={[{ name: 'Services' }]}
      />

      {/* Services List */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-24">
            {services.map((service, index) => (
              <div
                key={service.id}
                id={service.id}
                className={`scroll-mt-32 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
              >
                <div className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''}`}>
                  {/* Content */}
                  <div>
                    <div className="w-20 h-20 bg-primary-100 rounded-2xl flex items-center justify-center text-primary-600 mb-6">
                      {service.icon}
                    </div>

                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                      {service.title}
                    </h2>

                    <p className="text-lg text-gray-600 mb-6">
                      {service.description}
                    </p>

                    <p className="text-gray-600 mb-8">
                      {service.details}
                    </p>

                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-2 bg-primary-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-primary-600 transition-all hover:shadow-lg"
                    >
                      Schedule Consultation
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  </div>

                  {/* Features Card */}
                  <div className="bg-gray-50 rounded-3xl p-8 lg:p-10">
                    <h3 className="text-xl font-bold text-gray-900 mb-6">What's Included</h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {service.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center gap-3">
                          <div className="w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center flex-shrink-0">
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {index < services.length - 1 && (
                  <div className="border-b border-gray-200 mt-24"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Insurance & Payment */}
      <section className="py-20 lg:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Insurance */}
            <div className="bg-white rounded-3xl p-8 lg:p-10 shadow-lg">
              <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center text-primary-600 mb-6">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-4">Insurance Accepted</h3>
              <p className="text-gray-600 mb-6">
                We accept most major dental insurance plans and will work with you to maximize your benefits.
              </p>

              <ul className="space-y-3 mb-6">
                {['Delta Dental', 'Cigna', 'Aetna', 'MetLife', 'United Healthcare', 'Blue Cross Blue Shield'].map((insurance, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">{insurance}</span>
                  </li>
                ))}
              </ul>

              <p className="text-sm text-gray-500">
                Don't see your insurance? Contact us - we work with many other providers!
              </p>
            </div>

            {/* Payment Options */}
            <div className="bg-primary-500 rounded-3xl p-8 lg:p-10 text-white">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>

              <h3 className="text-2xl font-bold mb-4">Flexible Payment Options</h3>
              <p className="text-white/80 mb-6">
                Don't let cost prevent you from getting the care you need. We offer multiple payment options to fit your budget.
              </p>

              <ul className="space-y-3 mb-8">
                {[
                  'Cash, Check & Credit Cards',
                  'CareCredit Financing',
                  'In-House Payment Plans',
                  'Senior Discounts',
                  'Family Discounts',
                  'No-Insurance Discount Plan',
                ].map((option, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{option}</span>
                  </li>
                ))}
              </ul>

              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-white text-primary-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
              >
                Discuss Payment Options
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            Not Sure Which Service You Need?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Schedule a consultation and Dr. Mitchell will evaluate your needs and create a personalized treatment plan.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-primary-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-primary-600 transition-all hover:shadow-lg"
          >
            Schedule Free Consultation
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>
    </>
  );
};

export default Services;
