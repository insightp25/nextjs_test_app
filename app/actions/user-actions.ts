"use server"

export async function searchUsers(name: string) {
    const DB = [
        {id: 1, name: "daisy"},
        {id: 2, name: "tom"},
        {id: 3, name: "michael"},
    ];

    return DB.filter((user) => user.name.includes(name));
}