
import paper from "paper";

export interface UserPath {
    path: paper.Path;
    user: string;
    id: number;
}

export interface sUserPath {
    path: string;
    user: string;
    id: number;
}

export function clientToServerPath(userPath: UserPath): sUserPath {
    return { path: userPath.path.exportJSON(), user: userPath.user, id: userPath.id} ;
}

export function serverToClientPath(s_userPath: sUserPath): UserPath {
    const newPath = new paper.Path();
    newPath.importJSON(s_userPath.path);
    return { path: newPath, user: s_userPath.user, id: s_userPath.id};
}