export class GlobalConstants {
    //message
    public static genericError: string = "Quelque chose s'est passe. Veuillez réessayer plus tard.";

    //expression régulière
    public static nomExpReg: string = "[a-zA-Z0-9 ]*";

    public static emailExpReg: string = "[a-zA-Z0-9._%-]+@[a-zA-Z0-9._%-]+\.[a-z{2,3}]";

    public static telephoneExpReg: string = "^[0-9]{8,8}$";

    //variable
    public static erreur: string = "error";
}