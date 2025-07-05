// controllers/aiController.js
exports.analyzeSkills = (req, res) => {
  const { skills } = req.body;
  if (!skills || typeof skills !== 'string') {
    return res.status(400).json({ error: 'Invalid input format' });
  }

  const userSkills = skills.toLowerCase().split(',').map(skill => skill.trim());

  const roles = {
    'Frontend Developer': ['html', 'css', 'javascript', 'react', 'vue', 'next.js', 'tailwind'],
    'Backend Developer': ['node.js', 'express', 'django', 'flask', 'mongodb', 'sql', 'api', 'authentication'],
    'Full Stack Developer': ['html', 'css', 'javascript', 'react', 'node.js', 'express', 'mongodb'],
    'Data Analyst': ['python', 'sql', 'excel', 'pandas', 'numpy', 'data visualization', 'power bi'],
    'AI/ML Engineer': ['python', 'machine learning', 'deep learning', 'tensorflow', 'pytorch', 'model training'],
    'DevOps Engineer': ['docker', 'kubernetes', 'aws', 'linux', 'jenkins', 'ci/cd', 'infrastructure'],
    'Cybersecurity Analyst': ['network security', 'firewalls', 'ethical hacking', 'linux', 'cryptography', 'incident response']
  };

  let bestMatch = { role: '', match: 0, skills: [] };

  for (const [role, roleSkills] of Object.entries(roles)) {
    const matched = roleSkills.filter(rs =>
      userSkills.some(us => us.includes(rs))
    );
    const matchPercent = Math.round((matched.length / roleSkills.length) * 100);

    if (matchPercent > bestMatch.match) {
      bestMatch = {
        role,
        match: matchPercent,
        skills: matched
      };
    }
  }

  return res.json({
    suggestion: bestMatch.role,
    confidence: bestMatch.match,
    matchedSkills: bestMatch.skills,
    aiAdvice: `To strengthen your profile for ${bestMatch.role}, consider learning: ${roles[bestMatch.role]
      .filter(skill => !bestMatch.skills.includes(skill))
      .join(', ')}.`
  });
};
