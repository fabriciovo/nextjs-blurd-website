export interface IUser {
    username: string | null;
    user: any;
}

export interface IGMUsers {
    beta_tester: boolean;
    first_login:  boolean;
    coins: number;
    total_coins: number;
    coins_per_second: number;
    collectables: string;
    craft_items: string;
    quests: string;
    secret_items: string;
    shop_items: string;
    upgrades: string;
}

