import CategoryCard from './CategoryCard';

const CardsSection = () => {
  const cards = [
    {
      title: 'రచనలు',
      description: 'మనసును తాకే ఆలోచనలు, అనుభూతులు, భావాల సమాహారం.',
      link: '/writings',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
        </svg>
      )
    },
    {
      title: 'కవితలు',
      description: 'పదాలతో పూచిన భావాల పువ్వులు, హృదయానికి హత్తుకునే కవితలు.',
      link: '/poems',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
        </svg>
      )
    },
    {
      title: 'అక్షరార్థం',
      description: "'వసంతం' అనే పదంలోని ప్రతి అక్షరానికి అర్థం, ఆవిర్భావం.",
      link: '/meaning',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      )
    },
    {
      title: 'వ్యాఖ్యానం',
      description: 'జీవిత సత్యాలు, సూత్రాలు, అనుభవాల్ని పలికించిన వ్యాఖ్యానం.',
      link: '/commentary',
      icon: (
        <span className="font-serif text-xl font-bold leading-none">“</span>
      )
    }
  ];

  return (
    <section className="relative z-20 py-8 px-4 md:px-8 max-w-7xl mx-auto bg-[#F6EEDF]">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {cards.map((card, index) => (
          <CategoryCard 
            key={index}
            title={card.title}
            description={card.description}
            link={card.link}
            icon={card.icon}
          />
        ))}
      </div>
    </section>
  );
};

export default CardsSection;
