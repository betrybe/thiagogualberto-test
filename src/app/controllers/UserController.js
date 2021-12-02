function validateEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
}

class UserController {
    async store(req, res) {
        const { name, email, password } = req.body;

        if ((this.name === undefined) || (this.email === undefined) || (this.password === undefined)) {
            return res.status(400).json({ message: 'Invalid entries. Try again.' });
        }

        // Verificar se o e-mail é válido.
        if (!validateEmail(this.email)){
            return res.status(400).json({ message: "Invalid entries. Try again." });
        }

        // Verificar se o e-mail de um usuário é único
        const userExists = await User.findOne({
            where: { email }
        });
        if (userExists){
            return res.status(409).json({message: "Email already registered."})
        }

        const user = {
            name,
            email,
            role: "user",
            _id: "sdfasdasbdlasdbfasldf"
        }

        return res.status(201).json({ user });
    }
}

module.exports = new UserController();