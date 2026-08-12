const jwt = require('jsonwebtoken');

app.post('/api/admin/login', (req, res) => {
    const { email, password } = req.body;

    // التحقق من المطابقة مع ملف البيئة مباشرة
    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
        // إنشاء Token للفرونت إند
        const token = jwt.sign({ role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '1d' });
        
        return res.json({
            message: 'Login successful',
            token: token
        });
    }

    return res.status(401).json({ message: 'Invalid credentials' });
});