import { Loader2, Mail, MapPin, Users } from "lucide-react";
import React from "react";
import Link from "next/link";
import { NoTeacherFound } from "./NoTeacherFound";

const DirectoryContent = ({ loading, teachers, resetFilters }: any) => {
  return (
    console.log("Teachers", teachers),
    (
      <>
        <div className="relative min-h-[400px]">
          {loading && (
            <div className="absolute inset-0 bg-slate-50/50 backdrop-blur-[2px] z-10 flex items-center justify-center rounded-3xl">
              <div className="flex flex-col items-center gap-3">
                <Loader2 className="w-10 h-10 text-indigo-600 animate-spin" />
                <span className="text-slate-500 font-bold text-sm tracking-widest uppercase">
                  Fetching...
                </span>
              </div>
            </div>
          )}

          {teachers.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {teachers.map((teacher: any) => (
                <Link
                  href={`/teachers/${teacher.id}`}
                  key={teacher.id}
                  className="group bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-50 -mr-12 -mt-12 rounded-full group-hover:bg-indigo-100 transition-colors"></div>
                  <div className="relative">
                    <div className="w-20 h-20 bg-indigo-100 rounded-2xl mb-4 overflow-hidden shadow-inner">
                      {teacher.profilePicture ? (
                        <img
                          src={teacher.profilePicture}
                          alt={`${teacher.firstName} ${teacher.lastName}`}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-indigo-400 text-2xl font-bold capitalize">
                          {teacher.firstName[0]}
                          {teacher.lastName[0]}
                        </div>
                      )}
                    </div>

                    <div className="space-y-1">
                      <h3 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                        {teacher.firstName} {teacher.lastName}
                      </h3>
                      <div className="flex items-center gap-2 text-slate-500 text-sm">
                        <MapPin size={14} className="text-indigo-400" />
                        <span>Room {teacher.roomNumber}</span>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-slate-50 space-y-2">
                      <div className="flex items-center gap-2 text-slate-600 text-sm">
                        <Mail size={14} className="shrink-0" />
                        <span className="truncate">{teacher.email}</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {teacher.subjects.slice(0, 3).map((subject: any) => (
                          <span
                            key={subject}
                            className="bg-slate-100 text-slate-600 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-tight"
                          >
                            {subject}
                          </span>
                        ))}
                        {teacher.subjects.length > 3 && (
                          <span className="text-[10px] font-bold text-slate-400 flex items-center h-6 px-1">
                            +{teacher.subjects.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            !loading && <NoTeacherFound resetFilters={resetFilters} />
          )}
        </div>
      </>
    )
  );
};

export default DirectoryContent;
