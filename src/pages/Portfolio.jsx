import { useState } from 'react';
import { motion } from 'framer-motion';
import { usePortfolioProjects } from '../hooks/useSanityData';
import portfolioDataFallback from '../data/portfolio.json';
import Card from '../components/shared/Card';

const Portfolio = () => {
  const [filter, setFilter] = useState('all');
  const { data: sanityProjects, loading } = usePortfolioProjects();
  const portfolioData = sanityProjects?.length ? sanityProjects : portfolioDataFallback;

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'residential', label: 'Residential' },
    { id: 'commercial', label: 'Commercial' },
    { id: 'pumps-equipment', label: 'Pumps & Equipment' }
  ];

  const filteredProjects = filter === 'all'
    ? portfolioData
    : portfolioData.filter((project) => project.category === filter);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4" />
          <p className="text-secondary-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <title>Portfolio | Snyder Mechanical – Elko, NV</title>
      <meta name="description" content="View Snyder Mechanical's project portfolio including residential, commercial, and industrial mechanical work across northeastern Nevada." />
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 text-white pt-36 pb-20">
        <div className="container-custom">
          <div className="flex items-center gap-3 mb-5">
            <span className="w-8 h-px bg-white/60 flex-shrink-0" />
            <span className="text-white/60 text-sm font-medium uppercase tracking-[0.18em]">Our Work</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-white tracking-tight mb-4">Our Portfolio</h1>
          <p className="text-lg text-white/75 max-w-xl">
            Explore our completed projects across northeastern Nevada
          </p>
        </div>
      </section>

      {/* Filter */}
      <section className="py-8 bg-white border-b border-secondary-200">
        <div className="container-custom">
          <div className="flex flex-wrap gap-3">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setFilter(cat.id)}
                className={`px-5 py-2 rounded-md font-medium text-sm transition-colors ${
                  filter === cat.id
                    ? 'bg-primary-900 text-white'
                    : 'bg-secondary-100 text-secondary-700 hover:bg-secondary-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card hover className="h-full">
                  <div className="aspect-video bg-secondary-200 rounded-md mb-4 flex items-center justify-center">
                    <span className="text-secondary-400 text-sm">Project Image</span>
                  </div>
                  <div className="mb-2">
                    <span className="inline-block px-2.5 py-0.5 border border-primary-200 text-primary-700 text-xs rounded-md font-medium">
                      {project.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-secondary-900 mb-2">
                    {project.title}
                  </h3>
                  <p className="text-secondary-600 mb-2">
                    {project.description}
                  </p>
                  <p className="text-sm text-secondary-500">
                    {project.details}
                  </p>
                  <p className="text-sm text-secondary-400 mt-2">
                    Completed: {project.year}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;
