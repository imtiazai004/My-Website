"use client";
import React from "react";
import { motion } from "motion/react";


export const TestimonialsColumn = (props: {
  className?: string;
  testimonials: { text: string; image: string; name: string; role: string }[];
  duration?: number;
}) => {
  return (
    <div className={props.className}>
      <motion.div
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration: props.duration || 10,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6"
      >
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {props.testimonials.map(({ text, image, name, role }, i) => (
                <div className="p-10 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-lg shadow-brand-accent/5 max-w-xs w-full" key={`${index}-${i}`}>
                  <div className="text-white/80 font-light leading-relaxed">{text}</div>
                  <div className="flex items-center gap-4 mt-8 pt-6 border-t border-white/5">
                    <img
                      width={40}
                      height={40}
                      src={image}
                      alt={name}
                      className="h-10 w-10 rounded-full border border-white/10"
                      referrerPolicy="no-referrer"
                    />
                    <div className="flex flex-col">
                      <div className="font-bold text-white tracking-tight leading-5">{name}</div>
                      <div className="text-[10px] text-brand-accent font-black uppercase tracking-widest mt-1">{role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </React.Fragment>
          )),
        ]}
      </motion.div>
    </div>
  );
};
