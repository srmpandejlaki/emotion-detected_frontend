class Utils {
  static generateDate() {
    const today = new Date();

    return today.toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  }
};

export default Utils;