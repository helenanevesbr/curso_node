module.exports = () => {
    var secret = process.env.SECRET || 'helena'
    return () => secret
}