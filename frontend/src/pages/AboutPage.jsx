const AboutPage = () => {
  return (
    <div className="min-h-screen bg-[#F6EEDF] py-12 px-4 md:px-8">
      <div className="max-w-4xl mx-auto bg-[#F8F1E4] rounded-3xl p-8 md:p-12 border border-[#E6D7BD] shadow-xl">
        
        <div className="text-center mb-8 border-b border-[#E6D7BD] pb-6">
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-[#3B6533] mb-2">
            రచయిత్రి పరిచయం (About the Author)
          </h1>
          <p className="font-serif text-lg text-[#A08530] font-semibold">
            గీతా వసంత లక్ష్మి (Geeta Vasanta Laxmi)
          </p>
          <p className="font-sans text-xs text-[#6C5338] tracking-wider mt-1">
            కలం పేరు: <span className="font-bold text-[#3B6533]">వసంతం</span>
          </p>
        </div>

        <div className="space-y-6 font-sans text-base text-[#4A3520] leading-relaxed">
          <p>
            'వసంతం' అనేది కేవలం ఒక వెబ్‌సైట్ మాత్రమే కాదు. ఇది నా మాతృమూర్తి శ్రీమతి <strong>గీతా వసంత లక్ష్మి</strong> గారి అమూల్యమైన సాహిత్యాన్ని, భావాలను భద్రపరచే ఒక డిజిటల్ అక్షర నిధి.
          </p>

          <p>
            వసంత ఋతువు ప్రకృతికి నూతన శోభను, చైతన్యాన్ని ఏ విధంగా తీసుకువస్తుందో, అమ్మ రచనలు కూడా మనసులకు అటువంటి ప్రశాంతతను, ఆధ్యాత్మిక చింతనను మరియు జీవన మూల్యాలను అందిస్తాయి.
          </p>

          <div className="p-6 rounded-2xl bg-[#F6EEDF] border border-[#D8C6A5] my-6">
            <h3 className="font-serif text-lg font-bold text-[#3B6533] mb-2">
              సాహిత్య తత్త్వం (Literary Vision)
            </h3>
            <p className="italic text-[#5C4328]">
              "మనసు పలికిన ప్రతి భావానికి ఒక అక్షర రూపం ఇస్తూ, తెలుగు సంస్కృతి, ఉగాది పండుగ శోభ, ఆధ్యాత్మికత మరియు ప్రకృతి సౌందర్యాన్ని ఈ రచనలలో ప్రతిబింబించారు."
            </p>
          </div>

          <p>
            కవితలు, వ్యాఖ్యానాలు మరియు ఆలోచనాత్మక రచనల ద్వారా తెలుగు సాహిత్యానికి తమదైన శైలిలో అక్షర సేవ అందిస్తున్నారు.
          </p>
        </div>

      </div>
    </div>
  );
};

export default AboutPage;
