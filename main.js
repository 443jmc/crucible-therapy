// ===== Navigation Toggle =====
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking a link
    const navLinkItems = document.querySelectorAll('.nav-links a');
    navLinkItems.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.offsetTop - navHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Initialize quizzes
    initializeQuizzes();
});

// ===== Quiz Data =====
const quizData = {
    differentiation: {
        title: "Differentiation Self-Assessment",
        type: "self-assessment",
        questions: [
            {
                question: "When my partner disagrees with me on something important, I tend to:",
                options: [
                    { text: "Get anxious and try to convince them to see it my way", score: 1 },
                    { text: "Feel hurt and withdraw from the conversation", score: 1 },
                    { text: "Listen to their perspective while maintaining my own view", score: 4 },
                    { text: "Quickly change my position to avoid conflict", score: 1 }
                ]
            },
            {
                question: "How do you typically feel when your partner is upset with you?",
                options: [
                    { text: "Overwhelmed and unable to think clearly", score: 1 },
                    { text: "Defensive and ready to argue my point", score: 2 },
                    { text: "Uncomfortable but able to stay present and listen", score: 4 },
                    { text: "Desperate to fix things immediately", score: 1 }
                ]
            },
            {
                question: "When making important decisions, I:",
                options: [
                    { text: "Usually defer to my partner's preferences", score: 1 },
                    { text: "Insist on getting my way", score: 2 },
                    { text: "Consider both perspectives and advocate for what I believe", score: 4 },
                    { text: "Avoid making the decision altogether", score: 1 }
                ]
            },
            {
                question: "My sense of self-worth is:",
                options: [
                    { text: "Heavily dependent on my partner's approval", score: 1 },
                    { text: "Sometimes affected by my partner's mood", score: 2 },
                    { text: "Generally stable regardless of my partner's reactions", score: 4 },
                    { text: "Based on always being right", score: 2 }
                ]
            },
            {
                question: "When my partner wants space or time alone, I:",
                options: [
                    { text: "Feel rejected and anxious", score: 1 },
                    { text: "Take it personally and feel hurt", score: 1 },
                    { text: "Respect their need and use the time for myself", score: 4 },
                    { text: "Feel relieved to have a break", score: 2 }
                ]
            },
            {
                question: "In conflicts, I am able to:",
                options: [
                    { text: "Rarely stay calm - I either shut down or explode", score: 1 },
                    { text: "Sometimes maintain composure if the topic isn't too sensitive", score: 2 },
                    { text: "Usually stay grounded even when discussing difficult topics", score: 4 },
                    { text: "Always stay calm by not caring about the outcome", score: 2 }
                ]
            },
            {
                question: "When sharing something vulnerable with my partner, I:",
                options: [
                    { text: "Need them to respond positively or I feel crushed", score: 1 },
                    { text: "Hope they'll validate me but can handle if they don't", score: 3 },
                    { text: "Share authentically without needing a specific response", score: 4 },
                    { text: "Rarely share anything vulnerable", score: 1 }
                ]
            },
            {
                question: "My opinions and values:",
                options: [
                    { text: "Often shift to match my partner's", score: 1 },
                    { text: "Occasionally change when my partner challenges them", score: 2 },
                    { text: "Remain consistent while I stay open to new perspectives", score: 4 },
                    { text: "Never change regardless of evidence or input", score: 2 }
                ]
            },
            {
                question: "When my partner is having a bad day, I:",
                options: [
                    { text: "Feel responsible for fixing their mood", score: 1 },
                    { text: "Get pulled into their negative state", score: 1 },
                    { text: "Offer support while maintaining my own emotional equilibrium", score: 4 },
                    { text: "Distance myself to avoid being affected", score: 2 }
                ]
            },
            {
                question: "I can tolerate my partner seeing parts of me that I'm not proud of:",
                options: [
                    { text: "Very rarely - I hide my flaws", score: 1 },
                    { text: "Sometimes, but it makes me very anxious", score: 2 },
                    { text: "Yes, though it's uncomfortable", score: 3 },
                    { text: "Yes, I can be authentically myself", score: 4 }
                ]
            },
            {
                question: "When my partner criticizes me, I:",
                options: [
                    { text: "Feel devastated and question my worth", score: 1 },
                    { text: "Immediately become defensive", score: 2 },
                    { text: "Consider if there's truth in it while maintaining self-respect", score: 4 },
                    { text: "Dismiss it entirely - they're just wrong", score: 2 }
                ]
            },
            {
                question: "In my relationship, I pursue my own interests and goals:",
                options: [
                    { text: "Rarely - I focus on what we do together", score: 1 },
                    { text: "Sometimes, but feel guilty about it", score: 2 },
                    { text: "Regularly, while staying connected to my partner", score: 4 },
                    { text: "Constantly - my partner barely factors in", score: 2 }
                ]
            },
            {
                question: "When there's tension between us, I can:",
                options: [
                    { text: "Barely function until it's resolved", score: 1 },
                    { text: "Get through the day but am preoccupied", score: 2 },
                    { text: "Continue functioning while working toward resolution", score: 4 },
                    { text: "Ignore it and hope it goes away", score: 1 }
                ]
            },
            {
                question: "I express my true thoughts and feelings to my partner:",
                options: [
                    { text: "Rarely - I'm afraid of their reaction", score: 1 },
                    { text: "Sometimes, when I think they'll agree", score: 2 },
                    { text: "Regularly, even when it might be uncomfortable", score: 4 },
                    { text: "Always, without considering their feelings", score: 2 }
                ]
            },
            {
                question: "My ability to soothe myself when upset is:",
                options: [
                    { text: "Poor - I need my partner to calm me down", score: 1 },
                    { text: "Moderate - I can sometimes calm myself", score: 2 },
                    { text: "Good - I can usually regulate my emotions independently", score: 4 },
                    { text: "I don't get upset because I don't let things affect me", score: 2 }
                ]
            }
        ],
        interpretations: [
            { min: 15, max: 25, level: "Developing", description: "Your responses suggest you may be at an earlier stage of differentiation development. This is common and represents an opportunity for significant growth. You might find that your sense of self is closely tied to your partner's responses, and relationship anxiety may be a frequent experience. Focus on developing your capacity to self-soothe and maintain your perspective during disagreements." },
            { min: 26, max: 40, level: "Growing", description: "You show signs of developing differentiation, with some areas stronger than others. You may find that you can maintain yourself well in some situations but struggle in others, particularly when emotions run high. Continue working on staying grounded during conflict and expressing yourself authentically even when you're unsure of your partner's reaction." },
            { min: 41, max: 50, level: "Solid", description: "Your responses indicate a fairly well-developed capacity for differentiation. You're generally able to maintain your sense of self while staying connected to your partner. You can likely tolerate disagreement and express yourself authentically in most situations. Continue refining your ability to stay present during the most challenging moments." },
            { min: 51, max: 60, level: "Well-Differentiated", description: "You demonstrate strong differentiation abilities. You appear to have a solid sense of self that remains stable regardless of your partner's reactions. You can likely engage in vulnerable self-disclosure without needing validation, and maintain your emotional equilibrium even during conflict. Your capacity for true intimacy - knowing and being known - is well-developed." }
        ]
    },
    fourpointsquiz: {
        title: "Four Points of Balance Quiz",
        type: "educational",
        questions: [
            {
                question: "What is the first of the Four Points of Balance?",
                options: [
                    { text: "Quiet Mind-Calm Heart", score: 0 },
                    { text: "Solid Flexible Self", score: 1 },
                    { text: "Grounded Responding", score: 0 },
                    { text: "Meaningful Endurance", score: 0 }
                ],
                correct: 1,
                explanation: "Solid Flexible Self is the first point of balance. It refers to having a clear sense of your identity, values, and beliefs—while remaining genuinely open to new information and perspectives. It's the ability to say 'This is who I am' without becoming rigid or closed off."
            },
            {
                question: "What does 'Quiet Mind-Calm Heart' refer to?",
                options: [
                    { text: "Meditating every day", score: 0 },
                    { text: "Never feeling anxious", score: 0 },
                    { text: "The ability to self-soothe and regulate your own emotions", score: 1 },
                    { text: "Staying silent during arguments", score: 0 }
                ],
                correct: 2,
                explanation: "Quiet Mind-Calm Heart is the capacity to self-soothe—to calm your own anxiety and regulate your own emotions rather than depending on your partner or external circumstances to make you feel okay. It's the internal steadiness that allows you to think clearly even when things get intense."
            },
            {
                question: "Grounded Responding means:",
                options: [
                    { text: "Always agreeing with your partner to avoid conflict", score: 0 },
                    { text: "Acting from your values rather than emotional reactivity", score: 1 },
                    { text: "Taking time to respond to every text message", score: 0 },
                    { text: "Standing your ground no matter what", score: 0 }
                ],
                correct: 1,
                explanation: "Grounded Responding is the ability to act from your values and clear thinking rather than from emotional reactivity. It's choosing your response rather than having it hijacked by fight-flight-freeze reactions. It means pausing before responding when triggered and saying what you actually mean."
            },
            {
                question: "Meaningful Endurance involves:",
                options: [
                    { text: "Tolerating abuse in a relationship", score: 0 },
                    { text: "Never giving up on anything", score: 0 },
                    { text: "Tolerating discomfort in service of growth and your values", score: 1 },
                    { text: "Enduring a bad marriage for the children", score: 0 }
                ],
                correct: 2,
                explanation: "Meaningful Endurance is the capacity to tolerate discomfort, pain, and anxiety in service of something important—whether that's personal growth, relationship development, or living according to your values. The word 'meaningful' is crucial—it's not suffering for suffering's sake, but endurance with purpose."
            },
            {
                question: "A person with a 'Solid Flexible Self' would likely:",
                options: [
                    { text: "Change their opinion to match whoever they're talking to", score: 0 },
                    { text: "Refuse to ever consider another perspective", score: 0 },
                    { text: "Hold their position while remaining genuinely curious about their partner's view", score: 1 },
                    { text: "Avoid sharing their opinions to prevent conflict", score: 0 }
                ],
                correct: 2,
                explanation: "Someone with a Solid Flexible Self can hold their position while remaining genuinely curious about their partner's view. 'Solid' doesn't mean rigid—they can consider other perspectives without feeling threatened. And 'flexible' doesn't mean wishy-washy—they remain anchored in who they are while staying open to growth."
            },
            {
                question: "Which is NOT a characteristic of Quiet Mind-Calm Heart?",
                options: [
                    { text: "Being able to calm yourself when anxious", score: 0 },
                    { text: "Needing your partner to reassure you before you can feel okay", score: 1 },
                    { text: "Maintaining the ability to think clearly during emotional conversations", score: 0 },
                    { text: "Having practices that help you return to center when triggered", score: 0 }
                ],
                correct: 1,
                explanation: "Needing your partner to reassure you before you can feel okay is the opposite of Quiet Mind-Calm Heart. This point of balance is about self-soothing—regulating your own emotions rather than depending on your partner. While support from others is valuable, Quiet Mind-Calm Heart means you can function without it."
            },
            {
                question: "When your partner says something hurtful, Grounded Responding would look like:",
                options: [
                    { text: "Immediately firing back with a hurtful comment of your own", score: 0 },
                    { text: "Shutting down and refusing to talk", score: 0 },
                    { text: "Pausing, then responding thoughtfully from your values", score: 1 },
                    { text: "Pretending it didn't bother you", score: 0 }
                ],
                correct: 2,
                explanation: "Grounded Responding means pausing before responding when triggered, then responding thoughtfully from your values rather than reactively from hurt or anger. It's not about being perfectly calm or suppressing emotions—it's about choosing your response rather than being hijacked by reactivity."
            },
            {
                question: "Meaningful Endurance is different from just 'enduring' because:",
                options: [
                    { text: "It involves physical exercise", score: 0 },
                    { text: "The discomfort serves growth, values, or something important", score: 1 },
                    { text: "It's only for short periods of time", score: 0 },
                    { text: "It requires a therapist to guide you", score: 0 }
                ],
                correct: 1,
                explanation: "The 'meaningful' in Meaningful Endurance is crucial. It's not about enduring abuse or staying in destructive situations. It's about tolerating discomfort when that discomfort serves growth, values, or something genuinely important. Suffering without purpose isn't a virtue."
            },
            {
                question: "How do the Four Points of Balance work together?",
                options: [
                    { text: "You only need to develop one of them", score: 0 },
                    { text: "They are separate skills that don't affect each other", score: 0 },
                    { text: "They form an integrated system where each supports the others", score: 1 },
                    { text: "You must master them in order, one at a time", score: 0 }
                ],
                correct: 2,
                explanation: "The Four Points work as an integrated system—like four legs of a table, you need all four for stability. Solid Flexible Self gives you something to hold onto; Quiet Mind-Calm Heart lets you access that solid self under pressure; Grounded Responding translates inner stability into outer actions; and Meaningful Endurance keeps you engaged long enough for the others to matter."
            },
            {
                question: "Developing the Four Points of Balance primarily helps you:",
                options: [
                    { text: "Win arguments with your partner", score: 0 },
                    { text: "Avoid all conflict in relationships", score: 0 },
                    { text: "Maintain your sense of self while staying connected to your partner", score: 1 },
                    { text: "Become emotionally independent from everyone", score: 0 }
                ],
                correct: 2,
                explanation: "The Four Points of Balance help you maintain your sense of self while staying connected to your partner—especially during challenging moments. They're not about winning, avoiding conflict, or becoming isolated. They're about becoming a more differentiated person who can engage authentically in intimate relationships."
            }
        ]
    },
    // COUPLES IMPLEMENTATION QUIZZES
    hugging: {
        title: "Hugging Till Relaxed Practice Assessment",
        type: "self-assessment",
        description: "Evaluate your readiness and experience with the 'Hugging Till Relaxed' technique.",
        questions: [
            {
                question: "When you and your partner embrace in a long hug, what typically happens?",
                options: [
                    { text: "One or both of us quickly pulls away or feels uncomfortable", score: 1 },
                    { text: "We hold on but I notice tension in my body or racing thoughts", score: 2 },
                    { text: "We can stay connected for a while but eventually feel restless", score: 3 },
                    { text: "We both gradually relax and feel genuinely calm together", score: 4 }
                ]
            },
            {
                question: "During a prolonged embrace, I tend to:",
                options: [
                    { text: "Focus on when it will end or what my partner is thinking", score: 1 },
                    { text: "Try to 'fix' the moment by adjusting position or talking", score: 2 },
                    { text: "Sometimes drift mentally but can bring myself back", score: 3 },
                    { text: "Focus on my own breathing and allow myself to settle", score: 4 }
                ]
            },
            {
                question: "When physically close to my partner in silence, I feel:",
                options: [
                    { text: "Anxious and need to fill the silence with words or action", score: 1 },
                    { text: "Somewhat uncomfortable but can tolerate it briefly", score: 2 },
                    { text: "Generally okay, though my mind sometimes wanders", score: 3 },
                    { text: "Present and connected without needing to do anything", score: 4 }
                ]
            },
            {
                question: "My ability to physically support my own weight while hugging (standing on my own feet) is:",
                options: [
                    { text: "Poor - I tend to lean heavily on my partner or feel unbalanced", score: 1 },
                    { text: "Inconsistent - I sometimes catch myself leaning too much", score: 2 },
                    { text: "Good - I can usually maintain my own balance", score: 3 },
                    { text: "Strong - I feel grounded and balanced while fully embracing", score: 4 }
                ]
            },
            {
                question: "If my partner seems tense during a hug, I typically:",
                options: [
                    { text: "Become tense myself or pull away", score: 1 },
                    { text: "Try to make them relax by rubbing their back or talking", score: 2 },
                    { text: "Notice it but focus on staying calm myself", score: 3 },
                    { text: "Stay centered and trust that they'll settle in their own time", score: 4 }
                ]
            },
            {
                question: "After practicing intentional, prolonged hugging, I notice:",
                options: [
                    { text: "We haven't really tried this or it felt too awkward", score: 1 },
                    { text: "Some benefit but we don't do it consistently", score: 2 },
                    { text: "It helps us reconnect, especially after stressful days", score: 3 },
                    { text: "It has become a meaningful ritual that deepens our bond", score: 4 }
                ]
            },
            {
                question: "When I notice myself getting anxious during physical closeness, I:",
                options: [
                    { text: "Usually can't calm down until I create some distance", score: 1 },
                    { text: "Struggle but sometimes manage to stay present", score: 2 },
                    { text: "Can usually use my breath to settle myself", score: 3 },
                    { text: "Have reliable ways to self-soothe while staying connected", score: 4 }
                ]
            },
            {
                question: "The idea of standing in a silent embrace for 5-10 minutes sounds:",
                options: [
                    { text: "Impossible or extremely uncomfortable", score: 1 },
                    { text: "Challenging but something I could try", score: 2 },
                    { text: "Doable and potentially meaningful", score: 3 },
                    { text: "Like something we already do or would enjoy", score: 4 }
                ]
            }
        ],
        interpretations: [
            { min: 8, max: 14, level: "Beginning", description: "Physical closeness and prolonged embracing feel challenging for you right now. This is completely normal - many couples find this difficult initially. Start with shorter hugs (30-60 seconds) and focus on your own breathing. The goal isn't to force relaxation but to gradually build your tolerance for intimate physical contact. Practice standing on your own two feet while hugging, focusing on your own center of gravity." },
            { min: 15, max: 22, level: "Developing", description: "You're building capacity for sustained physical intimacy. You may notice that you can sometimes stay present but other times feel the urge to escape or fix the moment. This is progress! Continue practicing with intention - try setting a timer for 3-5 minutes and focus solely on calming yourself (not your partner). Notice when you start to get anxious and practice breathing through it." },
            { min: 23, max: 28, level: "Progressing", description: "You have developed meaningful capacity for intimate physical connection. You can generally self-soothe while staying present with your partner. To deepen this practice, try extending your hugging sessions and notice subtler levels of relaxation. Pay attention to moments when you and your partner seem to 'sync up' - this is the co-regulation that Schnarch describes as deeply bonding." },
            { min: 29, max: 32, level: "Advanced", description: "You demonstrate strong ability to be physically intimate while maintaining your own emotional center. 'Hugging till relaxed' likely feels natural and nourishing for your relationship. Continue using this practice as a touchstone, especially during stressful times. You might explore other intimacy practices that build on this foundation, such as maintaining eye contact during vulnerable moments or experimenting with the 'eyes-open' techniques Schnarch describes." }
        ]
    },
    fourpoints: {
        title: "Four Points of Balance Assessment",
        type: "self-assessment",
        description: "Evaluate your development across the Four Points of Balance: Solid Flexible Self, Quiet Mind-Calm Heart, Grounded Responding, and Meaningful Endurance.",
        questions: [
            {
                question: "SOLID FLEXIBLE SELF: When my partner has a different opinion than me, I:",
                options: [
                    { text: "Often doubt myself and wonder if I'm wrong", score: 1 },
                    { text: "Feel defensive but sometimes consider their view", score: 2 },
                    { text: "Can hold my position while genuinely hearing theirs", score: 3 },
                    { text: "Stay clear about who I am while remaining open to influence", score: 4 }
                ]
            },
            {
                question: "SOLID FLEXIBLE SELF: My sense of identity in my relationship is:",
                options: [
                    { text: "Largely defined by my partner's view of me", score: 1 },
                    { text: "Sometimes shaky when we're in conflict", score: 2 },
                    { text: "Generally stable with occasional wobbles", score: 3 },
                    { text: "Clear and consistent regardless of relationship dynamics", score: 4 }
                ]
            },
            {
                question: "QUIET MIND-CALM HEART: When relationship tension arises, my internal state is:",
                options: [
                    { text: "Racing thoughts and strong emotional reactivity", score: 1 },
                    { text: "Anxious but I can sometimes slow down my reactions", score: 2 },
                    { text: "I can usually find some calm even when things are difficult", score: 3 },
                    { text: "I can maintain inner quiet and process emotions clearly", score: 4 }
                ]
            },
            {
                question: "QUIET MIND-CALM HEART: My ability to self-soothe during conflict is:",
                options: [
                    { text: "Very limited - I need my partner to calm me down", score: 1 },
                    { text: "Developing - I have some tools but they don't always work", score: 2 },
                    { text: "Reliable - I can usually regulate my own emotions", score: 3 },
                    { text: "Strong - I have consistent practices that help me stay centered", score: 4 }
                ]
            },
            {
                question: "GROUNDED RESPONDING: When my partner says something hurtful, I typically:",
                options: [
                    { text: "React immediately with hurt or anger", score: 1 },
                    { text: "Try not to react but often fail", score: 2 },
                    { text: "Can pause before responding most of the time", score: 3 },
                    { text: "Respond thoughtfully from my values rather than reactively", score: 4 }
                ]
            },
            {
                question: "GROUNDED RESPONDING: In heated discussions, my responses come from:",
                options: [
                    { text: "Fear, hurt, or the need to defend myself", score: 1 },
                    { text: "A mix of reactivity and intention", score: 2 },
                    { text: "Mostly a centered place, with occasional reactivity", score: 3 },
                    { text: "A grounded sense of who I am and what I value", score: 4 }
                ]
            },
            {
                question: "MEANINGFUL ENDURANCE: When growth in our relationship requires discomfort, I:",
                options: [
                    { text: "Avoid the discomfort at almost any cost", score: 1 },
                    { text: "Can tolerate some discomfort but often give up", score: 2 },
                    { text: "Can persist through discomfort when I see the purpose", score: 3 },
                    { text: "Embrace necessary discomfort as part of growth", score: 4 }
                ]
            },
            {
                question: "MEANINGFUL ENDURANCE: My capacity to stay engaged during prolonged relationship challenges is:",
                options: [
                    { text: "Limited - I tend to withdraw or give up quickly", score: 1 },
                    { text: "Inconsistent - depends on the issue and my energy", score: 2 },
                    { text: "Generally strong - I can hang in for important matters", score: 3 },
                    { text: "Well-developed - I can persist meaningfully through difficulty", score: 4 }
                ]
            },
            {
                question: "OVERALL: When I think about my personal growth within my relationship, I believe:",
                options: [
                    { text: "My partner needs to change for things to improve", score: 1 },
                    { text: "We both need to change, but I'm not sure how", score: 2 },
                    { text: "I'm actively working on myself and seeing some progress", score: 3 },
                    { text: "I consistently use our relationship as a growth opportunity", score: 4 }
                ]
            },
            {
                question: "OVERALL: My relationship challenges make me feel:",
                options: [
                    { text: "Hopeless or like we're fundamentally broken", score: 1 },
                    { text: "Frustrated but still trying", score: 2 },
                    { text: "Challenged but optimistic about growth", score: 3 },
                    { text: "Engaged in meaningful work that will strengthen us both", score: 4 }
                ]
            }
        ],
        interpretations: [
            { min: 10, max: 17, level: "Foundation Building", description: "Your Four Points of Balance are in early development. This is where most people start! Focus first on Quiet Mind-Calm Heart - developing your ability to self-soothe is foundational to all the other points. Try simple practices: when you notice anxiety rising, focus on slow breathing before responding. Remember that differentiation is a lifelong journey, and every small step counts." },
            { min: 18, max: 26, level: "Active Development", description: "You're actively developing your Four Points, with some areas stronger than others. Notice which points feel most challenging - that's where your growth edge is. For Solid Flexible Self, practice stating your position clearly even when you're uncertain of your partner's reaction. For Grounded Responding, try waiting 10 seconds before responding in heated moments. Keep building your capacity bit by bit." },
            { min: 27, max: 34, level: "Strong Foundation", description: "You have a solid foundation in the Four Points of Balance. You can likely maintain yourself reasonably well during relationship challenges. To continue growing, work on extending your capacity during your most difficult moments - that's where the real growth happens. Practice Meaningful Endurance by staying engaged with issues you'd normally avoid. Notice how your increased differentiation affects your partner and your relationship dynamics." },
            { min: 35, max: 40, level: "Well-Developed", description: "Your Four Points of Balance are well-developed. You likely experience your relationship challenges as growth opportunities rather than threats. Continue refining your practice by paying attention to subtle moments of reactivity or self-abandonment. At this level, you can often help shift relationship dynamics simply by maintaining your own center. Consider how you might support (without rescuing) your partner's development while continuing your own growth." }
        ]
    },
    gridlock: {
        title: "Working Through Gridlock Assessment",
        type: "self-assessment",
        description: "Assess your ability to navigate relationship gridlock and use stuck points as opportunities for growth.",
        questions: [
            {
                question: "When my partner and I hit an impasse on an important issue, I typically:",
                options: [
                    { text: "Shut down, give in, or escalate until someone 'wins'", score: 1 },
                    { text: "Feel stuck and resentful but don't know what to do", score: 2 },
                    { text: "Try to understand the deeper issues beneath the surface conflict", score: 3 },
                    { text: "See it as information about where we both need to grow", score: 4 }
                ]
            },
            {
                question: "I understand that gridlock in relationships is:",
                options: [
                    { text: "A sign of incompatibility or a broken relationship", score: 1 },
                    { text: "Frustrating and something we should try to avoid", score: 2 },
                    { text: "Normal and potentially meaningful, though difficult", score: 3 },
                    { text: "A natural mechanism that pushes both partners to develop", score: 4 }
                ]
            },
            {
                question: "When facing the same recurring conflict, I:",
                options: [
                    { text: "Feel hopeless - we've been over this a thousand times", score: 1 },
                    { text: "Try the same approaches hoping for different results", score: 2 },
                    { text: "Look for what I might be contributing to the pattern", score: 3 },
                    { text: "Ask myself what growth is being asked of me", score: 4 }
                ]
            },
            {
                question: "My ability to stay engaged (not withdraw) during prolonged disagreement is:",
                options: [
                    { text: "Very limited - I either explode or retreat", score: 1 },
                    { text: "Challenged - I can stay for a while but eventually shut down", score: 2 },
                    { text: "Reasonable - I can hang in there if I see progress", score: 3 },
                    { text: "Strong - I can remain present even without immediate resolution", score: 4 }
                ]
            },
            {
                question: "When my partner won't budge on something important to me, I:",
                options: [
                    { text: "Feel rejected and question if they really love me", score: 1 },
                    { text: "Get angry and try to pressure them to change", score: 2 },
                    { text: "Feel disappointed but try to understand their position", score: 3 },
                    { text: "Focus on what I can control - my own response and growth", score: 4 }
                ]
            },
            {
                question: "I believe that for gridlock to resolve:",
                options: [
                    { text: "My partner needs to see things my way", score: 1 },
                    { text: "We need to find a compromise (even if neither is happy)", score: 2 },
                    { text: "One or both of us needs to grow or shift perspective", score: 3 },
                    { text: "I need to become a stronger, more differentiated person", score: 4 }
                ]
            },
            {
                question: "When I think about 'holding onto myself' during conflict, I:",
                options: [
                    { text: "Don't really understand what that means", score: 1 },
                    { text: "Understand the concept but struggle to do it", score: 2 },
                    { text: "Can do it sometimes, especially in lower-stakes situations", score: 3 },
                    { text: "Have practiced this and can maintain myself even in tough moments", score: 4 }
                ]
            },
            {
                question: "My partner and I approach our recurring issues:",
                options: [
                    { text: "By avoiding them or having the same fight repeatedly", score: 1 },
                    { text: "With frustration, wishing the other would just change", score: 2 },
                    { text: "With some curiosity about what's really going on beneath", score: 3 },
                    { text: "As a team working on individual and shared growth", score: 4 }
                ]
            },
            {
                question: "The concept that 'marriage operates at the limit of your ability' feels:",
                options: [
                    { text: "Discouraging or overwhelming", score: 1 },
                    { text: "Somewhat true but hard to work with", score: 2 },
                    { text: "Accurate and gives me a framework for understanding struggles", score: 3 },
                    { text: "Liberating - it normalizes difficulty and points toward growth", score: 4 }
                ]
            },
            {
                question: "When I imagine truly resolving our biggest gridlock, I see:",
                options: [
                    { text: "My partner finally agreeing with me", score: 1 },
                    { text: "Finding some middle ground we can both live with", score: 2 },
                    { text: "Both of us understanding each other more deeply", score: 3 },
                    { text: "Both of us becoming more differentiated, changing the entire dynamic", score: 4 }
                ]
            }
        ],
        interpretations: [
            { min: 10, max: 17, level: "Gridlock Reactive", description: "You may be experiencing gridlock as threatening or hopeless. This is understandable - it's painful to feel stuck. Start by reframing: gridlock isn't a sign your relationship is failing; it's a sign you're both being pushed to grow. Focus on understanding your own patterns first. When you hit an impasse, ask yourself: 'What's this asking of me?' rather than 'Why won't my partner change?'" },
            { min: 18, max: 26, level: "Gridlock Aware", description: "You understand that gridlock has meaning but may struggle to work with it productively. You're building important awareness. Practice staying engaged without trying to immediately fix or resolve. Sometimes gridlock resolves not through agreement but through each person growing enough that the issue transforms. Focus on what you can control - your own development and responses." },
            { min: 27, max: 34, level: "Gridlock Navigator", description: "You have a working understanding of gridlock as a growth mechanism and can often use stuck points productively. Continue developing your ability to 'hold onto yourself' during the most challenging moments. Notice how your own growth affects the gridlock dynamic - often when one partner becomes more differentiated, the entire pattern shifts." },
            { min: 35, max: 40, level: "Gridlock Master", description: "You demonstrate sophisticated understanding of gridlock and strong capacity to use it for growth. You likely see your toughest relationship moments as your greatest teachers. At this level, you can often help shift gridlock simply by maintaining your own differentiation. Continue refining your practice and consider how your growth might inspire (not force) your partner's development." }
        ]
    }
};

// ===== Quiz State =====
let quizState = {
    differentiation: { currentQuestion: 0, answers: [], active: false },
    fourpointsquiz: { currentQuestion: 0, answers: [], active: false },
    hugging: { currentQuestion: 0, answers: [], active: false },
    fourpoints: { currentQuestion: 0, answers: [], active: false },
    gridlock: { currentQuestion: 0, answers: [], active: false }
};

// ===== Quiz Functions =====
function initializeQuizzes() {
    Object.keys(quizData).forEach(quizId => {
        renderQuestion(quizId, 0);
    });
}

function startQuiz(quizId) {
    // Hide quiz cards
    document.querySelector('.quiz-grid').style.display = 'none';

    // Show quiz container
    const container = document.getElementById(`quiz-${quizId}`);
    container.classList.add('active');

    // Reset state
    quizState[quizId] = { currentQuestion: 0, answers: [], active: true };

    // Render first question
    renderQuestion(quizId, 0);
    updateProgress(quizId);

    // Scroll to quiz
    container.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function renderQuestion(quizId, questionIndex) {
    const quiz = quizData[quizId];
    const question = quiz.questions[questionIndex];
    const container = document.querySelector(`#quiz-${quizId} .quiz-questions`);

    const selectedAnswer = quizState[quizId].answers[questionIndex];
    const hasAnswered = selectedAnswer !== undefined;
    const isEducational = quiz.type === 'educational';
    const isCorrect = isEducational && hasAnswered && selectedAnswer === question.correct;

    let html = `
        <div class="quiz-question">
            <h3>${questionIndex + 1}. ${question.question}</h3>
            <div class="quiz-options">
    `;

    question.options.forEach((option, index) => {
        const isSelected = selectedAnswer === index;
        let optionClass = isSelected ? 'selected' : '';

        // For educational quizzes, show correct/incorrect after answering
        if (isEducational && hasAnswered) {
            if (index === question.correct) {
                optionClass += ' correct';
            } else if (isSelected && index !== question.correct) {
                optionClass += ' incorrect';
            }
        }

        html += `
            <label class="quiz-option ${optionClass}" onclick="selectOption('${quizId}', ${questionIndex}, ${index})">
                <input type="radio" name="q${questionIndex}" value="${index}" ${isSelected ? 'checked' : ''}>
                ${option.text}
                ${isEducational && hasAnswered && index === question.correct ? '<span class="correct-indicator">✓</span>' : ''}
            </label>
        `;
    });

    html += `
            </div>
    `;

    // Add explanation for educational quizzes
    if (isEducational && hasAnswered && question.explanation) {
        html += `
            <div class="quiz-explanation show ${isCorrect ? 'correct' : 'incorrect'}">
                <h5>${isCorrect ? '✓ Correct!' : '✗ Not quite'}</h5>
                <p>${question.explanation}</p>
            </div>
        `;
    }

    html += `
        </div>
    `;

    container.innerHTML = html;
}

function selectOption(quizId, questionIndex, optionIndex) {
    const quiz = quizData[quizId];
    const wasAlreadyAnswered = quizState[quizId].answers[questionIndex] !== undefined;

    quizState[quizId].answers[questionIndex] = optionIndex;

    // For educational quizzes, re-render to show explanation
    if (quiz.type === 'educational' && !wasAlreadyAnswered) {
        renderQuestion(quizId, questionIndex);
    } else {
        // Update visual selection
        const options = document.querySelectorAll(`#quiz-${quizId} .quiz-option`);
        options.forEach((opt, index) => {
            opt.classList.toggle('selected', index === optionIndex);
        });
    }
}

function nextQuestion(quizId) {
    const state = quizState[quizId];
    const quiz = quizData[quizId];

    // Check if answer selected
    if (state.answers[state.currentQuestion] === undefined) {
        alert('Please select an answer before continuing.');
        return;
    }

    // Check if last question
    if (state.currentQuestion >= quiz.questions.length - 1) {
        showResults(quizId);
        return;
    }

    // Move to next question
    state.currentQuestion++;
    renderQuestion(quizId, state.currentQuestion);
    updateProgress(quizId);
    updateNavigation(quizId);
}

function prevQuestion(quizId) {
    const state = quizState[quizId];

    if (state.currentQuestion > 0) {
        state.currentQuestion--;
        renderQuestion(quizId, state.currentQuestion);
        updateProgress(quizId);
        updateNavigation(quizId);
    }
}

function updateProgress(quizId) {
    const state = quizState[quizId];
    const quiz = quizData[quizId];
    const total = quiz.questions.length;
    const current = state.currentQuestion + 1;
    const percentage = (current / total) * 100;

    const container = document.getElementById(`quiz-${quizId}`);
    container.querySelector('.progress-fill').style.width = `${percentage}%`;
    container.querySelector('.progress-text').textContent = `Question ${current} of ${total}`;
}

function updateNavigation(quizId) {
    const state = quizState[quizId];
    const quiz = quizData[quizId];
    const container = document.getElementById(`quiz-${quizId}`);

    const prevBtn = container.querySelector('.quiz-navigation .btn-secondary');
    const nextBtn = container.querySelector('.quiz-navigation .btn-primary');

    prevBtn.disabled = state.currentQuestion === 0;
    nextBtn.textContent = state.currentQuestion >= quiz.questions.length - 1 ? 'See Results' : 'Next';
}

function showResults(quizId) {
    const state = quizState[quizId];
    const quiz = quizData[quizId];
    const container = document.getElementById(`quiz-${quizId}`);

    // Hide questions and navigation
    container.querySelector('.quiz-questions').style.display = 'none';
    container.querySelector('.quiz-navigation').style.display = 'none';
    container.querySelector('.quiz-progress').style.display = 'none';

    // Calculate score
    let score = 0;
    let maxScore = 0;
    if (quiz.type === 'self-assessment') {
        state.answers.forEach((answerIndex, questionIndex) => {
            score += quiz.questions[questionIndex].options[answerIndex].score;
        });
        maxScore = quiz.questions.length * 4;
    } else {
        state.answers.forEach((answerIndex, questionIndex) => {
            if (answerIndex === quiz.questions[questionIndex].correct) {
                score++;
            }
        });
        maxScore = quiz.questions.length;
    }

    // Get interpretation
    let interpretation;
    if (quiz.type === 'self-assessment') {
        interpretation = quiz.interpretations.find(i => score >= i.min && score <= i.max);
    } else {
        const percentage = Math.round((score / quiz.questions.length) * 100);
        if (percentage >= 80) {
            interpretation = { level: "Excellent!", description: `You scored ${score}/${quiz.questions.length} (${percentage}%). You have a strong understanding of Crucible Therapy concepts!` };
        } else if (percentage >= 60) {
            interpretation = { level: "Good", description: `You scored ${score}/${quiz.questions.length} (${percentage}%). You have a solid foundation in Crucible Therapy concepts. Review the articles and book summaries to deepen your understanding.` };
        } else {
            interpretation = { level: "Keep Learning", description: `You scored ${score}/${quiz.questions.length} (${percentage}%). There's more to explore! Check out our articles and book summaries to learn more about Crucible Therapy.` };
        }
    }

    // Calculate percentage for circle
    const percentage = Math.round((score / maxScore) * 100);
    const circumference = 2 * Math.PI * 90; // radius = 90
    const dashoffset = circumference - (percentage / 100) * circumference;

    // Show results with visual chart
    const resultsDiv = container.querySelector('.quiz-results');

    let resultsHTML = `
        <div class="score-circle">
            <svg viewBox="0 0 200 200">
                <circle class="bg" cx="100" cy="100" r="90"/>
                <circle class="progress" cx="100" cy="100" r="90"
                    stroke-dasharray="${circumference}"
                    stroke-dashoffset="${dashoffset}"/>
            </svg>
            <div class="score-text">
                <span class="score-number">${quiz.type === 'self-assessment' ? score : percentage + '%'}</span>
                <span class="score-label">${quiz.type === 'self-assessment' ? `out of ${maxScore}` : `${score}/${maxScore} correct`}</span>
            </div>
        </div>
    `;

    resultsDiv.querySelector('.quiz-score').innerHTML = resultsHTML;

    resultsDiv.querySelector('.quiz-interpretation').innerHTML = `
        <h4>${interpretation.level}</h4>
        <p>${interpretation.description}</p>
    `;

    // Add share section
    let shareSection = resultsDiv.querySelector('.share-results');
    if (!shareSection) {
        shareSection = document.createElement('div');
        shareSection.className = 'share-results';
        resultsDiv.appendChild(shareSection);
    }

    const shareText = `I scored ${quiz.type === 'self-assessment' ? score + '/' + maxScore : percentage + '%'} on the ${quiz.title}! Take the quiz at crucibletherapy.org`;

    shareSection.innerHTML = `
        <h4>Share Your Results</h4>
        <div class="share-buttons">
            <button class="share-btn" onclick="copyResults('${quizId}', '${shareText}')">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                </svg>
                Copy Results
            </button>
            <button class="share-btn" onclick="shareTwitter('${encodeURIComponent(shareText)}')">
                <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
                Share on X
            </button>
            <button class="share-btn" onclick="shareEmail('${quiz.title}', '${encodeURIComponent(shareText)}')">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                Email Results
            </button>
        </div>
    `;

    resultsDiv.classList.add('active');
}

// Share functions
function copyResults(quizId, text) {
    navigator.clipboard.writeText(text).then(() => {
        const btn = event.target.closest('.share-btn');
        const originalHTML = btn.innerHTML;
        btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg> Copied!';
        setTimeout(() => {
            btn.innerHTML = originalHTML;
        }, 2000);
    });
}

function shareTwitter(text) {
    window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank', 'width=550,height=420');
}

function shareEmail(subject, body) {
    window.location.href = `mailto:?subject=${encodeURIComponent(subject + ' Results')}&body=${body}`;
}

function resetQuiz(quizId) {
    const container = document.getElementById(`quiz-${quizId}`);

    // Reset state
    quizState[quizId] = { currentQuestion: 0, answers: [], active: false };

    // Hide container
    container.classList.remove('active');

    // Show quiz grid
    document.querySelector('.quiz-grid').style.display = 'grid';

    // Reset display
    container.querySelector('.quiz-questions').style.display = 'block';
    container.querySelector('.quiz-navigation').style.display = 'flex';
    container.querySelector('.quiz-progress').style.display = 'flex';
    container.querySelector('.quiz-results').classList.remove('active');

    // Reset question
    renderQuestion(quizId, 0);
    updateProgress(quizId);
    updateNavigation(quizId);
}

// ===== Scroll Animation =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.feature-card, .concept-card, .article-card, .book-card, .quiz-card').forEach(el => {
        observer.observe(el);
    });
});
