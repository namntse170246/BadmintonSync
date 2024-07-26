// // Định nghĩa URL của API
// const baseUrl = "http://meokool-001-site1.ltempurl.com";
// const apiGetAccount = baseUrl + "/api/Accounts/GetAll";
// const apiUpdateStatusAccount = baseUrl + "/api/Accounts/UpdateAccountStatus?id=";
// export { baseUrl, apiGetAccount, apiUpdateStatusAccount };
router.post('/resetpassword', async (req, res) => {
    const { token, password } = req.body;
    const user = await User.findOne({ where: { PasswordResetToken: token } });
    if (!user || user.PasswordResetTokenExpiration < Date.now()) {
        return res.status(400).json({ message: 'Invalid or expired token' });
    }
    user.Password = bcrypt.hashSync(password, 10);
    user.PasswordResetToken = null;
    user.PasswordResetTokenExpiration = null;
    await user.save();
    res.json({ message: 'Password has been reset' });
});
