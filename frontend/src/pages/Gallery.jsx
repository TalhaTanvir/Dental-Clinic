import { useState } from 'react';
import PageHeader from '../components/PageHeader';

const Gallery = () => {
  const [activeTab, setActiveTab] = useState('office');
  const [selectedImage, setSelectedImage] = useState(null);

  const categories = [
    { id: 'office', name: 'Our Office' },
    { id: 'smiles', name: 'Smile Gallery' },
    { id: 'team', name: 'Our Team' },
    { id: 'technology', name: 'Technology' },
  ];

  const galleryItems = {
    office: [
      { id: 1, title: 'Reception Area', description: 'Our welcoming front desk and comfortable waiting area', color: 'from-primary-400 to-primary-600' },
      { id: 2, title: 'Treatment Room 1', description: 'State-of-the-art treatment room with the latest equipment', color: 'from-primary-500 to-primary-700' },
      { id: 3, title: 'Treatment Room 2', description: 'Comfortable environment with calming views', color: 'from-primary-400 to-primary-600' },
      { id: 4, title: 'Consultation Room', description: 'Private space for discussing treatment plans', color: 'from-primary-500 to-primary-700' },
      { id: 5, title: 'Sterilization Center', description: 'Hospital-grade sterilization for your safety', color: 'from-primary-400 to-primary-600' },
      { id: 6, title: 'Kids Corner', description: 'Fun play area for our youngest patients', color: 'from-primary-500 to-primary-700' },
    ],
    smiles: [
      { id: 1, title: 'Teeth Whitening Case', description: 'Professional whitening - 8 shades brighter', before: 'Before: Stained teeth', after: 'After: Bright, white smile', color: 'from-accent-400 to-accent-600' },
      { id: 2, title: 'Veneer Transformation', description: 'Complete smile makeover with porcelain veneers', before: 'Before: Uneven, discolored teeth', after: 'After: Perfect, natural-looking smile', color: 'from-accent-500 to-accent-700' },
      { id: 3, title: 'Invisalign Results', description: '18-month Invisalign treatment', before: 'Before: Crowded teeth', after: 'After: Perfectly aligned smile', color: 'from-accent-400 to-accent-600' },
      { id: 4, title: 'Dental Implant Case', description: 'Single tooth implant replacement', before: 'Before: Missing front tooth', after: 'After: Natural-looking implant', color: 'from-accent-500 to-accent-700' },
      { id: 5, title: 'Crown Restoration', description: 'Full ceramic crown on damaged tooth', before: 'Before: Cracked, damaged tooth', after: 'After: Beautiful, strong crown', color: 'from-accent-400 to-accent-600' },
      { id: 6, title: 'Full Smile Makeover', description: 'Comprehensive treatment including whitening, veneers, and gum contouring', before: 'Before: Multiple issues', after: 'After: Complete transformation', color: 'from-accent-500 to-accent-700' },
    ],
    team: [
      { id: 1, title: 'Dr. Sarah Mitchell', description: 'Lead Dentist & Founder', role: 'DDS, FAGD', color: 'from-primary-400 to-primary-600' },
      { id: 2, title: 'Lisa Anderson', description: 'Dental Hygienist', role: '10+ years experience', color: 'from-primary-500 to-primary-700' },
      { id: 3, title: 'Maria Garcia', description: 'Office Manager', role: 'Your first point of contact', color: 'from-primary-400 to-primary-600' },
      { id: 4, title: 'James Wilson', description: 'Dental Assistant', role: 'Certified DA', color: 'from-primary-500 to-primary-700' },
      { id: 5, title: 'Team Meeting', description: 'Our weekly huddle to discuss patient care', role: 'Collaboration', color: 'from-primary-400 to-primary-600' },
      { id: 6, title: 'Community Event', description: 'Participating in local health fair', role: 'Community Care', color: 'from-primary-500 to-primary-700' },
    ],
    technology: [
      { id: 1, title: 'Digital X-Rays', description: '90% less radiation than traditional X-rays', color: 'from-gray-500 to-gray-700' },
      { id: 2, title: '3D Cone Beam CT', description: 'Precise imaging for implant planning', color: 'from-gray-600 to-gray-800' },
      { id: 3, title: 'Intraoral Camera', description: 'See exactly what we see in your mouth', color: 'from-gray-500 to-gray-700' },
      { id: 4, title: 'CEREC Same-Day Crowns', description: 'Custom crowns in a single visit', color: 'from-gray-600 to-gray-800' },
      { id: 5, title: 'Laser Dentistry', description: 'Minimally invasive soft tissue treatments', color: 'from-gray-500 to-gray-700' },
      { id: 6, title: 'Digital Impressions', description: 'Comfortable, accurate scans - no messy putty', color: 'from-gray-600 to-gray-800' },
    ],
  };

  return (
    <>
      <PageHeader
        title="Gallery"
        subtitle="Take a visual tour of our practice, see our smile transformations, and meet our team."
        breadcrumbs={[{ name: 'Gallery' }]}
      />

      {/* Gallery Tabs */}
      <section className="py-12 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveTab(category.id)}
                className={`px-6 py-3 rounded-full font-semibold transition-all ${
                  activeTab === category.id
                    ? 'bg-primary-500 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-20 lg:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Title */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {categories.find(c => c.id === activeTab)?.name}
            </h2>
            {activeTab === 'smiles' && (
              <p className="text-gray-600 max-w-2xl mx-auto">
                Real results from real patients. See the transformative power of modern dentistry.
                <br />
                <span className="text-sm text-gray-500">(Results may vary. All cases performed by Dr. Mitchell.)</span>
              </p>
            )}
          </div>

          {/* Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {galleryItems[activeTab].map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedImage(item)}
                className="group cursor-pointer"
              >
                <div className={`aspect-[4/3] bg-gradient-to-br ${item.color} rounded-2xl overflow-hidden relative shadow-lg group-hover:shadow-2xl transition-all group-hover:-translate-y-2`}>
                  {/* Placeholder for actual images */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    {activeTab === 'smiles' ? (
                      <div className="text-center text-white p-6">
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div className="bg-white/20 rounded-lg p-3">
                            <p className="text-xs uppercase tracking-wide opacity-80">Before</p>
                          </div>
                          <div className="bg-white/20 rounded-lg p-3">
                            <p className="text-xs uppercase tracking-wide opacity-80">After</p>
                          </div>
                        </div>
                        <svg className="w-16 h-16 mx-auto opacity-50" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                        </svg>
                      </div>
                    ) : activeTab === 'team' ? (
                      <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center">
                        <svg className="w-16 h-16 text-white/60" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C9.38 2 7.25 4.13 7.25 6.75c0 1.14.46 2.18 1.21 2.94-.41.22-.79.5-1.12.83A5.75 5.75 0 005 15.25V20c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2v-4.75a5.75 5.75 0 00-2.34-4.73c-.33-.33-.71-.61-1.12-.83.75-.76 1.21-1.8 1.21-2.94C16.75 4.13 14.62 2 12 2z"/>
                        </svg>
                      </div>
                    ) : (
                      <svg className="w-20 h-20 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    )}
                  </div>

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                    <div className="text-white">
                      <p className="font-semibold">{item.title}</p>
                      <p className="text-sm text-white/80">{item.description}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <h3 className="font-semibold text-gray-900">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.description}</p>
                  {item.role && (
                    <p className="text-sm text-primary-600 font-medium">{item.role}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Virtual Tour CTA */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-primary-500 to-primary-700 rounded-3xl p-8 lg:p-16 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                  Want to See More?
                </h2>
                <p className="text-lg text-white/80 mb-8">
                  Schedule a visit and take a personal tour of our office. We'd love to show 
                  you around and answer any questions you might have about our practice.
                </p>
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-white text-primary-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all hover:shadow-lg"
                >
                  Schedule a Visit
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/20 rounded-2xl p-6 text-center">
                  <svg className="w-12 h-12 mx-auto text-white mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <p className="text-white font-semibold">Virtual Tours</p>
                  <p className="text-white/70 text-sm">Coming Soon</p>
                </div>
                <div className="bg-white/20 rounded-2xl p-6 text-center">
                  <svg className="w-12 h-12 mx-auto text-white mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="text-white font-semibold">In-Person Tours</p>
                  <p className="text-white/70 text-sm">Available Now</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-3xl w-full overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className={`aspect-video bg-gradient-to-br ${selectedImage.color} flex items-center justify-center`}>
              {activeTab === 'smiles' ? (
                <div className="text-center text-white p-8">
                  <div className="grid grid-cols-2 gap-8 mb-6">
                    <div className="bg-white/20 rounded-xl p-6">
                      <p className="text-sm uppercase tracking-wide opacity-80 mb-2">Before</p>
                      <p className="text-sm opacity-60">{selectedImage.before}</p>
                    </div>
                    <div className="bg-white/20 rounded-xl p-6">
                      <p className="text-sm uppercase tracking-wide opacity-80 mb-2">After</p>
                      <p className="text-sm opacity-60">{selectedImage.after}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <svg className="w-32 h-32 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              )}
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">{selectedImage.title}</h3>
              <p className="text-gray-600">{selectedImage.description}</p>
              <button
                onClick={() => setSelectedImage(null)}
                className="mt-4 px-6 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Gallery;
