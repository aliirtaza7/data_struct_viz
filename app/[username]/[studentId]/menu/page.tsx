"use client";

import Link from 'next/link';
import { use } from 'react';

export const dataStructures = [
    // { name: 'Doubly Linked List', route: '/doublelinkedlist' },
    { name: 'Circular Linked List', route: '/circularlinkedlist' },
    { name: 'Linked List', route: '/linkedlist' },
    { name: 'Hashmap', route: '/hashmap' },
    { name: 'Queue', route: '/queue' },
    { name: 'Stack', route: '/stack' },
    { name: 'Stack from Linked List', route: '/linkedstack' },
    { name: 'Queue from Linked List', route: '/linkedqueue' },
    // { name: 'Directed Graph', route: '/directedgraph' },
    // { name: 'Undirected Graph', route: '/undirectedgraph' },
    // { name: 'Weighted Graph', route: '/weightedgraph' },
    { name: 'Binary Tree', route: '/binarytree' },
    // { name: 'Heap Min', route: '/heapmin' },
    // { name: 'Heap Max', route: '/heapmax' },
    { name: 'AVL Tree', route: '/avltree' },
];

type MenuProps = {
    params: Promise<{
        username: string;
        studentId: string;
    }>;
};

export default function Menu({ params }: MenuProps) {
    const { username, studentId } = use(params)

    return (
        <div className="page-shell flex justify-center">
            <div className="w-full max-w-5xl space-y-6">
                <section className="glass rounded-2xl p-6 md:p-8">
                    <h2 className="text-3xl font-bold text-[#CDD6F4] mb-2 text-center">
                        Visualization Hub
                    </h2>
                    <p className="text-center text-[#CDD6F4]/80">
                        Choose a data structure below and jump straight into an interactive simulation.
                    </p>
                </section>

                <section className="glass rounded-2xl p-6">
                    <h3 className="text-xl font-semibold text-[#CDD6F4] mb-4">
                        Structures Catalog
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {dataStructures.map((ds) => (
                            <Link
                                key={ds.route}
                                href={`/${username}/${studentId}/structures${ds.route}`}
                                className="glass bg-gradient-to-br from-[#252538] to-[#1E1E2E] rounded-2xl p-4 text-center border border-transparent hover:border-[#89B4FA]/50 transition-all"
                            >
                                <span className="text-[#CDD6F4] font-semibold">{ds.name}</span>
                            </Link>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}
