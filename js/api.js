/*
 * API simulada em localStorage para plataforma EAD Câmaras e Pneus
 */

const DB_KEY = 'cp_ead_db';

const seed = {
  departments: [
    { id: 1, name: 'Vendas' },
    { id: 2, name: 'Estoque' },
    { id: 3, name: 'Atendimento' },
    { id: 4, name: 'Manutenção' },
    { id: 5, name: 'Geral' }
  ],
  users: [
    {
      id: 1,
      name: 'Administrador',
      email: 'admin@camarasepeneus.com.br',
      password: btoa('admin123'),
      role: 'supervisor',
      departmentId: 5,
      createdAt: new Date().toISOString()
    }
  ],
  trainings: [
    {
      id: 1,
      title: 'Integração Câmaras e Pneus',
      description: 'Boas práticas da empresa e visão geral.',
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
      durationMinutes: 8,
      departmentId: 5,
      createdBy: 1,
      createdAt: new Date().toISOString()
    }
  ],
  progress: [],
  quizzes: [],
  quiz_results: [],
  certificates: [],
  comments: [],
  notifications: []
};

function getDB() {
  const raw = localStorage.getItem(DB_KEY);
  if (!raw) {
    localStorage.setItem(DB_KEY, JSON.stringify(seed));
    return structuredClone(seed);
  }
  return JSON.parse(raw);
}

function saveDB(db) {
  localStorage.setItem(DB_KEY, JSON.stringify(db));
}

function nextId(collection) {
  return collection.length ? Math.max(...collection.map(item => item.id)) + 1 : 1;
}

const api = {
  reset() {
    localStorage.setItem(DB_KEY, JSON.stringify(seed));
  },

  // users
  getUsers() {
    return getDB().users;
  },

  createUser(payload) {
    const db = getDB();
    if (db.users.some(u => u.email === payload.email)) {
      throw new Error('Email já cadastrado.');
    }
    const user = {
      id: nextId(db.users),
      name: payload.name,
      email: payload.email,
      password: btoa(payload.password),
      role: payload.role || 'student',
      departmentId: Number(payload.departmentId || 5),
      createdAt: new Date().toISOString()
    };
    db.users.push(user);
    saveDB(db);
    return user;
  },

  login(email, password) {
    const user = getDB().users.find(u => u.email === email && u.password === btoa(password));
    if (!user) throw new Error('Credenciais inválidas.');
    return user;
  },

  // departments
  getDepartments() {
    return getDB().departments;
  },

  // trainings
  getTrainings(filters = {}) {
    const db = getDB();
    return db.trainings.filter(t => {
      if (filters.departmentId && Number(filters.departmentId) !== t.departmentId) return false;
      if (filters.search && !`${t.title} ${t.description}`.toLowerCase().includes(filters.search.toLowerCase())) return false;
      return true;
    });
  },

  createTraining(payload, creatorId) {
    const db = getDB();
    const training = {
      id: nextId(db.trainings),
      title: payload.title,
      description: payload.description,
      videoUrl: payload.videoUrl,
      durationMinutes: Number(payload.durationMinutes || 10),
      departmentId: Number(payload.departmentId),
      createdBy: creatorId,
      createdAt: new Date().toISOString()
    };
    db.trainings.push(training);

    db.users.filter(u => u.role === 'student').forEach(student => {
      db.notifications.push({
        id: nextId(db.notifications),
        userId: student.id,
        type: 'new_training',
        message: `Novo treinamento disponível: ${training.title}`,
        read: false,
        createdAt: new Date().toISOString()
      });
    });

    saveDB(db);
    return training;
  },

  // progress
  upsertProgress(userId, trainingId, watchedPercent, currentTime) {
    const db = getDB();
    const existing = db.progress.find(p => p.userId === userId && p.trainingId === trainingId);
    if (existing) {
      existing.watchedPercent = Math.max(existing.watchedPercent, watchedPercent);
      existing.currentTime = currentTime;
      existing.updatedAt = new Date().toISOString();
    } else {
      db.progress.push({
        id: nextId(db.progress),
        userId,
        trainingId,
        watchedPercent,
        currentTime,
        updatedAt: new Date().toISOString()
      });
    }
    saveDB(db);
  },

  getUserProgress(userId) {
    return getDB().progress.filter(p => p.userId === userId);
  },

  // comments
  addComment(userId, trainingId, text, timecode) {
    const db = getDB();
    db.comments.push({
      id: nextId(db.comments),
      userId,
      trainingId,
      text,
      timecode,
      createdAt: new Date().toISOString()
    });
    saveDB(db);
  },

  getComments(trainingId) {
    const db = getDB();
    return db.comments
      .filter(c => c.trainingId === trainingId)
      .map(c => ({ ...c, author: db.users.find(u => u.id === c.userId)?.name || 'Usuário' }));
  },

  // quizzes
  getOrCreateQuiz(trainingId) {
    const db = getDB();
    const existing = db.quizzes.filter(q => q.trainingId === trainingId);
    if (existing.length) return existing;

    const template = [
      {
        question: 'Qual é o principal objetivo deste treinamento?',
        options: ['Aumentar custos', 'Padronizar processos', 'Reduzir atendimento', 'Ignorar segurança'],
        answer: 1
      },
      {
        question: 'Qual prática deve ser seguida no dia a dia?',
        options: ['Improviso total', 'Seguir procedimentos', 'Pular checklist', 'Evitar comunicação'],
        answer: 1
      },
      {
        question: 'Como agir em caso de dúvida?',
        options: ['Não perguntar', 'Consultar supervisor', 'Abandonar tarefa', 'Informar cliente errado'],
        answer: 1
      }
    ];

    template.forEach(item => {
      db.quizzes.push({
        id: nextId(db.quizzes),
        trainingId,
        ...item
      });
    });

    saveDB(db);
    return db.quizzes.filter(q => q.trainingId === trainingId);
  },

  submitQuiz(userId, trainingId, score) {
    const db = getDB();
    db.quiz_results.push({
      id: nextId(db.quiz_results),
      userId,
      trainingId,
      score,
      passed: score >= 70,
      createdAt: new Date().toISOString()
    });

    if (score >= 70) {
      const exists = db.certificates.find(c => c.userId === userId && c.trainingId === trainingId);
      if (!exists) {
        db.certificates.push({
          id: nextId(db.certificates),
          userId,
          trainingId,
          verificationCode: `CP-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
          issuedAt: new Date().toISOString()
        });
      }
    }

    saveDB(db);
  },

  // certificates
  getCertificates(userId) {
    const db = getDB();
    return db.certificates
      .filter(c => c.userId === userId)
      .map(c => ({
        ...c,
        user: db.users.find(u => u.id === c.userId),
        training: db.trainings.find(t => t.id === c.trainingId)
      }));
  },

  // notifications
  getNotifications(userId) {
    return getDB().notifications.filter(n => n.userId === userId);
  },

  markNotificationRead(id) {
    const db = getDB();
    const n = db.notifications.find(item => item.id === id);
    if (n) n.read = true;
    saveDB(db);
  },

  // stats
  getSupervisorStats() {
    const db = getDB();
    const students = db.users.filter(u => u.role === 'student');
    const completionRate = students.length
      ? Math.round((db.certificates.length / students.length) * 100)
      : 0;

    return {
      totalUsers: db.users.length,
      totalTrainings: db.trainings.length,
      totalCertificates: db.certificates.length,
      completionRate,
      byDepartment: db.departments.map(d => {
        const users = db.users.filter(u => u.departmentId === d.id && u.role === 'student').length;
        const trainings = db.trainings.filter(t => t.departmentId === d.id || t.departmentId === 5).length;
        return { name: d.name, users, trainings };
      }),
      certificatesByMonth: Array.from({ length: 12 }, (_, i) => ({
        month: i + 1,
        count: db.certificates.filter(c => new Date(c.issuedAt).getMonth() === i).length
      }))
    };
  }
};

window.api = api;
